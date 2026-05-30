const QUOTES_KEY = 'microtron_quotes_v1'
const ENQUIRIES_KEY = 'microtron_enquiries_v1'
const ADMIN_SESSION_KEY = 'microtron_admin_session_v1'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '')

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function isRemoteApiEnabled() {
  return Boolean(API_BASE_URL)
}

function buildApiUrl(path) {
  return `${API_BASE_URL}${path}`
}

async function requestJson(path, options = {}) {
  if (!isRemoteApiEnabled()) {
    throw new Error('Remote API is not configured.')
  }

  const response = await fetch(buildApiUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const fallbackMessage = `${response.status} ${response.statusText}`.trim()
    const bodyText = await response.text()
    let message = bodyText || fallbackMessage
    if (bodyText) {
      try {
        const payload = JSON.parse(bodyText)
        message = payload?.message || payload?.error || message
      } catch {
        message = bodyText || fallbackMessage
      }
    }
    throw new Error(message)
  }

  if (response.status === 204) return null
  return response.json()
}

function readList(key) {
  if (!canUseStorage()) return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeList(key, value) {
  if (!canUseStorage()) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
}

function normalizeFileEntry(file) {
  return {
    name: typeof file?.name === 'string' ? file.name : 'uploaded-file',
    size: Number(file?.size || 0),
  }
}

function normalizeQuotePayload(payload) {
  const files = Array.isArray(payload?.gerber?.files)
    ? payload.gerber.files.map(normalizeFileEntry)
    : []

  return {
    id: typeof payload?.id === 'string' && payload.id ? payload.id : createId('Q'),
    createdAt: typeof payload?.createdAt === 'string' && payload.createdAt ? payload.createdAt : new Date().toISOString(),
    providedAt: typeof payload?.providedAt === 'string' ? payload.providedAt : '',
    status: payload?.status === 'provided' ? 'provided' : 'pending',
    contact: {
      company: payload?.contact?.company || '',
      name: payload?.contact?.name || '',
      email: payload?.contact?.email || '',
      phone: payload?.contact?.phone || '',
      country: payload?.contact?.country || '',
    },
    pcb: {
      layers: payload?.pcb?.layers || '',
      width: payload?.pcb?.width || '',
      height: payload?.pcb?.height || '',
      qty: payload?.pcb?.qty || '',
      thickness: payload?.pcb?.thickness || '',
      surface: payload?.pcb?.surface || '',
      soldermask: payload?.pcb?.soldermask || '',
      silkscreen: payload?.pcb?.silkscreen || '',
    },
    assembly: {
      assembly: Boolean(payload?.assembly?.assembly),
      assemblyType: payload?.assembly?.assemblyType || '',
      supply: payload?.assembly?.supply || '',
      uniqueComps: payload?.assembly?.uniqueComps || '',
      specialReq: payload?.assembly?.specialReq || '',
    },
    gerber: {
      files,
      notes: payload?.gerber?.notes || '',
    },
    response: {
      amount: payload?.response?.amount || '',
      eta: payload?.response?.eta || '',
      subject: payload?.response?.subject || '',
      message: payload?.response?.message || '',
    },
  }
}

function normalizeQuoteRecord(raw) {
  return normalizeQuotePayload(raw)
}

function normalizeEnquiryPayload(payload) {
  return {
    id: typeof payload?.id === 'string' && payload.id ? payload.id : createId('E'),
    createdAt: typeof payload?.createdAt === 'string' && payload.createdAt ? payload.createdAt : new Date().toISOString(),
    company: payload?.company || '',
    contactName: payload?.contactName || payload?.name || '',
    email: payload?.email || '',
    phone: payload?.phone || '',
    subject: payload?.subject || '',
    message: payload?.message || '',
    source: payload?.source || 'contact',
  }
}

function normalizeEnquiryRecord(raw) {
  return normalizeEnquiryPayload(raw)
}

function sortByNewest(items) {
  return [...items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

function remoteQuotePath(id = '') {
  return id ? `/quotes/${encodeURIComponent(id)}` : '/quotes'
}

function remoteEnquiryPath(id = '') {
  return id ? `/enquiries/${encodeURIComponent(id)}` : '/enquiries'
}

export async function getQuoteRequests() {
  if (isRemoteApiEnabled()) {
    const data = await requestJson(remoteQuotePath())
    return sortByNewest(Array.isArray(data) ? data.map(normalizeQuoteRecord) : [])
  }

  return sortByNewest(readList(QUOTES_KEY).map(normalizeQuoteRecord))
}

export async function addQuoteRequest(payload) {
  const next = normalizeQuotePayload(payload)

  if (isRemoteApiEnabled()) {
    const saved = await requestJson(remoteQuotePath(), {
      method: 'POST',
      body: JSON.stringify(next),
    })
    return normalizeQuoteRecord(saved)
  }

  const current = await getQuoteRequests()
  writeList(QUOTES_KEY, [next, ...current])
  return next
}

export async function updateQuoteRequest(id, updater) {
  const current = await getQuoteRequests()
  const existing = current.find((item) => item.id === id)
  if (!existing) return null

  const next = updater(existing)

  if (isRemoteApiEnabled()) {
    const saved = await requestJson(remoteQuotePath(id), {
      method: 'PATCH',
      body: JSON.stringify(next),
    })
    return normalizeQuoteRecord(saved)
  }

  const merged = current.map((item) => (item.id === id ? next : item))
  writeList(QUOTES_KEY, merged)
  return next
}

export async function markQuoteProvided(id, response) {
  return updateQuoteRequest(id, (item) => ({
    ...item,
    status: 'provided',
    providedAt: new Date().toISOString(),
    response: {
      amount: response?.amount || '',
      eta: response?.eta || '',
      subject: response?.subject || '',
      message: response?.message || '',
    },
  }))
}

export async function markQuotePending(id) {
  return updateQuoteRequest(id, (item) => ({
    ...item,
    status: 'pending',
    providedAt: '',
  }))
}

export async function getEnquiries() {
  if (isRemoteApiEnabled()) {
    const data = await requestJson(remoteEnquiryPath())
    return sortByNewest(Array.isArray(data) ? data.map(normalizeEnquiryRecord) : [])
  }

  return sortByNewest(readList(ENQUIRIES_KEY).map(normalizeEnquiryRecord))
}

export async function addEnquiry(payload) {
  const next = normalizeEnquiryPayload(payload)

  if (isRemoteApiEnabled()) {
    const saved = await requestJson(remoteEnquiryPath(), {
      method: 'POST',
      body: JSON.stringify(next),
    })
    return normalizeEnquiryRecord(saved)
  }

  const current = await getEnquiries()
  writeList(ENQUIRIES_KEY, [next, ...current])
  return next
}

export function validateAdminCredentials(username, password) {
  return username === ADMIN_USER && password === ADMIN_PASS
}

export function getAdminSession() {
  if (!canUseStorage()) return false
  return window.localStorage.getItem(ADMIN_SESSION_KEY) === '1'
}

export function setAdminSession(isLoggedIn) {
  if (!canUseStorage()) return
  window.localStorage.setItem(ADMIN_SESSION_KEY, isLoggedIn ? '1' : '0')
}
