const QUOTES_KEY = 'microtron_quotes_v1'
const ENQUIRIES_KEY = 'microtron_enquiries_v1'
const ADMIN_SESSION_KEY = 'microtron_admin_session_v1'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
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

function normalizeQuotePayload(payload) {
  const files = Array.isArray(payload?.gerber?.files)
    ? payload.gerber.files.map((file) => ({
        name: typeof file?.name === 'string' ? file.name : 'uploaded-file',
        size: Number(file?.size || 0),
      }))
    : []

  return {
    id: createId('Q'),
    createdAt: new Date().toISOString(),
    providedAt: '',
    status: 'pending',
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
      assembly: Boolean(payload?.asm?.assembly),
      assemblyType: payload?.asm?.assemblyType || '',
      supply: payload?.asm?.supply || '',
      uniqueComps: payload?.asm?.uniqueComps || '',
      specialReq: payload?.asm?.specialReq || '',
    },
    gerber: {
      files,
      notes: payload?.gerber?.notes || '',
    },
    response: {
      amount: '',
      eta: '',
      subject: '',
      message: '',
    },
  }
}

function sortByNewest(items) {
  return [...items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function getQuoteRequests() {
  return sortByNewest(readList(QUOTES_KEY))
}

export function addQuoteRequest(payload) {
  const next = normalizeQuotePayload(payload)
  const current = getQuoteRequests()
  writeList(QUOTES_KEY, [next, ...current])
  return next
}

export function updateQuoteRequest(id, updater) {
  const current = getQuoteRequests()
  const next = current.map((item) => (item.id === id ? updater(item) : item))
  writeList(QUOTES_KEY, next)
  return next.find((item) => item.id === id) || null
}

export function markQuoteProvided(id, response) {
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

export function markQuotePending(id) {
  return updateQuoteRequest(id, (item) => ({
    ...item,
    status: 'pending',
    providedAt: '',
  }))
}

export function getEnquiries() {
  return sortByNewest(readList(ENQUIRIES_KEY))
}

export function addEnquiry(payload) {
  const next = {
    id: createId('E'),
    createdAt: new Date().toISOString(),
    company: payload?.company || '',
    contactName: payload?.name || '',
    email: payload?.email || '',
    phone: payload?.phone || '',
    subject: payload?.subject || '',
    message: payload?.message || '',
    source: payload?.source || 'contact',
  }

  const current = getEnquiries()
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

