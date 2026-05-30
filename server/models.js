import mongoose from 'mongoose'

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
}

function normalizeFileEntry(file) {
  return {
    name: typeof file?.name === 'string' ? file.name : 'uploaded-file',
    size: Number(file?.size || 0),
  }
}

export function normalizeQuoteBody(payload = {}) {
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

export function normalizeEnquiryBody(payload = {}) {
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

const quoteSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    createdAt: { type: String, required: true, index: true },
    providedAt: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'provided'], default: 'pending', index: true },
    contact: {
      company: { type: String, default: '' },
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      country: { type: String, default: '' },
    },
    pcb: {
      layers: { type: String, default: '' },
      width: { type: String, default: '' },
      height: { type: String, default: '' },
      qty: { type: String, default: '' },
      thickness: { type: String, default: '' },
      surface: { type: String, default: '' },
      soldermask: { type: String, default: '' },
      silkscreen: { type: String, default: '' },
    },
    assembly: {
      assembly: { type: Boolean, default: false },
      assemblyType: { type: String, default: '' },
      supply: { type: String, default: '' },
      uniqueComps: { type: String, default: '' },
      specialReq: { type: String, default: '' },
    },
    gerber: {
      files: [
        {
          name: { type: String, default: 'uploaded-file' },
          size: { type: Number, default: 0 },
        },
      ],
      notes: { type: String, default: '' },
    },
    response: {
      amount: { type: String, default: '' },
      eta: { type: String, default: '' },
      subject: { type: String, default: '' },
      message: { type: String, default: '' },
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
)

const enquirySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    createdAt: { type: String, required: true, index: true },
    company: { type: String, default: '' },
    contactName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    subject: { type: String, default: '' },
    message: { type: String, default: '' },
    source: { type: String, default: 'contact', index: true },
  },
  {
    versionKey: false,
    timestamps: false,
  },
)

export const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema)
export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema)

