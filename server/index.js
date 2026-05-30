import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Enquiry, Quote, normalizeEnquiryBody, normalizeQuoteBody } from './models.js'
import { sendEnquirySubmissionEmails, sendQuoteSubmissionEmails } from './mailer.js'

const app = express()
const port = Number(globalThis['process']?.env?.PORT || 3000)
const mongoUri = globalThis['process']?.env?.MONGODB_URI
const distPath = path.resolve(globalThis['process']?.cwd() || '.', 'dist')

app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.get('/api/quotes', async (_req, res, next) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }).lean()
    res.json(quotes)
  } catch (error) {
    next(error)
  }
})

app.post('/api/quotes', async (req, res, next) => {
  try {
    const nextQuote = normalizeQuoteBody(req.body)
    const saved = await Quote.create(nextQuote)
    let emailStatus = null
    try {
      emailStatus = await sendQuoteSubmissionEmails(saved.toObject())
    } catch (emailError) {
      console.error('Quote email delivery failed:', emailError)
      emailStatus = { owner: { error: 'Delivery failed.' }, user: { error: 'Delivery failed.' } }
    }
    res.status(201).json({ ...saved.toObject(), emailStatus })
  } catch (error) {
    next(error)
  }
})

app.patch('/api/quotes/:id', async (req, res, next) => {
  try {
    const quote = await Quote.findOne({ id: req.params.id })
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found.' })
    }

    const nextQuote = normalizeQuoteBody({
      ...quote.toObject(),
      ...req.body,
      id: quote.id,
      createdAt: quote.createdAt,
    })

    quote.set(nextQuote)
    const saved = await quote.save()
    res.json(saved.toObject())
  } catch (error) {
    next(error)
  }
})

app.get('/api/enquiries', async (_req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean()
    res.json(enquiries)
  } catch (error) {
    next(error)
  }
})

app.post('/api/enquiries', async (req, res, next) => {
  try {
    const nextEnquiry = normalizeEnquiryBody(req.body)
    const saved = await Enquiry.create(nextEnquiry)
    let emailStatus = null
    try {
      emailStatus = await sendEnquirySubmissionEmails(saved.toObject())
    } catch (emailError) {
      console.error('Enquiry email delivery failed:', emailError)
      emailStatus = { owner: { error: 'Delivery failed.' }, user: { error: 'Delivery failed.' } }
    }
    res.status(201).json({ ...saved.toObject(), emailStatus })
  } catch (error) {
    next(error)
  }
})

app.use((error, _req, res, next) => {
  console.error(error)
  void next
  res.status(500).json({
    message: 'Internal server error.',
  })
})

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return next()
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

async function start() {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is required.')
  }

  await mongoose.connect(mongoUri)
  app.listen(port, () => {
    console.log(`Microtron API listening on port ${port}`)
  })
}

const isDirectRun = fileURLToPath(import.meta.url) === path.resolve(globalThis['process']?.argv?.[1] || '')

if (isDirectRun) {
  start().catch((error) => {
    console.error(error)
    globalThis['process']?.exit(1)
  })
}

export { app, start }
