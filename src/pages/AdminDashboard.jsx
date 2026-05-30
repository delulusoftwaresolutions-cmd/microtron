import { useEffect, useMemo, useState } from 'react'
import { getEnquiries, getQuoteRequests, markQuotePending, markQuoteProvided } from '../utils/adminStore'
import { useCallback } from 'react'

function formatDate(value) {
  if (!value) return '-'
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

function badgeStyle(status) {
  if (status === 'provided') {
    return {
      border: '1px solid rgba(0, 212, 255, 0.45)',
      color: '#00d4ff',
      background: 'rgba(0, 212, 255, 0.1)',
    }
  }

  return {
    border: '1px solid rgba(0, 255, 136, 0.45)',
    color: '#00ff88',
    background: 'rgba(0, 255, 136, 0.1)',
  }
}

function QuoteCard({ quote, onSend, onReopen }) {
  const [draft, setDraft] = useState({
    amount: quote?.response?.amount || '',
    eta: quote?.response?.eta || '',
    subject: quote?.response?.subject || `Quote for ${quote?.contact?.company || quote?.contact?.name || 'Project'}`,
    message: quote?.response?.message || '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    setDraft({
      amount: quote?.response?.amount || '',
      eta: quote?.response?.eta || '',
      subject: quote?.response?.subject || `Quote for ${quote?.contact?.company || quote?.contact?.name || 'Project'}`,
      message: quote?.response?.message || '',
    })
  }, [quote])

  const isProvided = quote.status === 'provided'

  const handleSend = async () => {
    if (!draft.amount || !draft.message) {
      setError('Amount and quote details are required before sending.')
      return
    }
    setError('')
    try {
      await onSend(quote.id, draft)
    } catch (err) {
      setError(err?.message || 'Unable to send quote right now.')
    }
  }

  return (
    <article className="admin-quote-card">
      <div className="admin-quote-head">
        <div>
          <h3>{quote.contact.company || 'No company provided'}</h3>
          <p>{quote.contact.name || '-'} | {quote.contact.email || '-'} | {quote.contact.phone || '-'}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="admin-badge" style={badgeStyle(quote.status)}>{quote.status.toUpperCase()}</span>
          <span className="admin-ref">{quote.id}</span>
        </div>
      </div>

      <div className="admin-quote-grid">
        <div>
          <div className="admin-subtitle">PCB Specs</div>
          <div className="admin-meta">
            <div>Size: {quote.pcb.width} x {quote.pcb.height} mm</div>
            <div>Layers: {quote.pcb.layers}</div>
            <div>Qty: {quote.pcb.qty}</div>
            <div>Thickness: {quote.pcb.thickness}</div>
            <div>Finish: {quote.pcb.surface}</div>
            <div>Mask / Silk: {quote.pcb.soldermask} / {quote.pcb.silkscreen}</div>
          </div>
        </div>
        <div>
          <div className="admin-subtitle">Assembly & Files</div>
          <div className="admin-meta">
            <div>Assembly: {quote.assembly.assembly ? 'Yes' : 'No'}</div>
            {quote.assembly.assembly && (
              <>
                <div>Type: {quote.assembly.assemblyType || '-'}</div>
                <div>Supply: {quote.assembly.supply || '-'}</div>
                <div>Unique Components: {quote.assembly.uniqueComps || '-'}</div>
              </>
            )}
            <div>Gerber Files: {quote.gerber.files.length}</div>
            {quote.gerber.notes && <div>Notes: {quote.gerber.notes}</div>}
          </div>
        </div>
        <div>
          <div className="admin-subtitle">Create Quote Response</div>
          <div className="admin-response-grid">
            <input
              className="admin-input"
              placeholder="Amount (ex: INR 18,500)"
              value={draft.amount}
              onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
            />
            <input
              className="admin-input"
              placeholder="Lead Time / ETA"
              value={draft.eta}
              onChange={(e) => setDraft({ ...draft, eta: e.target.value })}
            />
            <input
              className="admin-input admin-input-wide"
              placeholder="Subject"
              value={draft.subject}
              onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
            />
            <textarea
              className="admin-input admin-input-wide"
              placeholder="Quote details to send to customer..."
              rows={4}
              value={draft.message}
              onChange={(e) => setDraft({ ...draft, message: e.target.value })}
            />
          </div>
          {error && <div className="admin-error">{error}</div>}
          <div className="admin-actions">
            {!isProvided && (
              <button className="btn-primary" onClick={handleSend}>
                Send Quote
              </button>
            )}
            {isProvided && (
              <button className="btn-outline" onClick={() => onReopen(quote.id)}>
                Move Back To Pending
              </button>
            )}
          </div>
          {quote.providedAt && <div className="admin-timestamp">Quote sent at: {formatDate(quote.providedAt)}</div>}
        </div>
      </div>

      <div className="admin-timestamp">Received at: {formatDate(quote.createdAt)}</div>
    </article>
  )
}

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('pending')
  const [quotes, setQuotes] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const refresh = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true)
    try {
      const [nextQuotes, nextEnquiries] = await Promise.all([getQuoteRequests(), getEnquiries()])
      setQuotes(nextQuotes)
      setEnquiries(nextEnquiries)
      setLoadError('')
    } catch (err) {
      setLoadError(err?.message || 'Unable to load quote data.')
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const onFocus = () => refresh({ silent: true })
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [refresh])

  const pendingQuotes = useMemo(() => quotes.filter((item) => item.status !== 'provided'), [quotes])
  const providedQuotes = useMemo(() => quotes.filter((item) => item.status === 'provided'), [quotes])

  const searchableText = (item) =>
    `${item?.id || ''} ${item?.contact?.company || ''} ${item?.contact?.name || ''} ${item?.contact?.email || ''} ${item?.contact?.phone || ''}`.toLowerCase()

  const pendingFiltered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return pendingQuotes
    return pendingQuotes.filter((item) => searchableText(item).includes(q))
  }, [pendingQuotes, search])

  const providedFiltered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return providedQuotes
    return providedQuotes.filter((item) => searchableText(item).includes(q))
  }, [providedQuotes, search])

  const leadList = useMemo(() => {
    const fromQuotes = quotes.map((item) => ({
      id: `lead-${item.id}`,
      type: 'Quote Request',
      createdAt: item.createdAt,
      company: item.contact.company || '-',
      contactName: item.contact.name || '-',
      email: item.contact.email || '-',
      phone: item.contact.phone || '-',
      status: item.status,
      subject: `${item.pcb.layers}L ${item.pcb.width}x${item.pcb.height} mm`,
    }))

    const fromEnquiries = enquiries.map((item) => ({
      id: `lead-${item.id}`,
      type: 'Enquiry',
      createdAt: item.createdAt,
      company: item.company || '-',
      contactName: item.contactName || '-',
      email: item.email || '-',
      phone: item.phone || '-',
      status: item.source || 'contact',
      subject: item.subject || '-',
    }))

    const merged = [...fromQuotes, ...fromEnquiries].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    const q = search.toLowerCase().trim()
    if (!q) return merged

    return merged.filter((item) => {
      const text = `${item.company} ${item.contactName} ${item.email} ${item.phone} ${item.type} ${item.subject}`.toLowerCase()
      return text.includes(q)
    })
  }, [quotes, enquiries, search])

  const handleSendQuote = async (id, draft) => {
    await markQuoteProvided(id, draft)
    await refresh({ silent: true })
    setActiveTab('provided')
  }

  const handleReopenQuote = async (id) => {
    await markQuotePending(id)
    await refresh({ silent: true })
    setActiveTab('pending')
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div>
          <div className="admin-eyebrow">Microtron Admin</div>
          <h1>Quote Management Dashboard</h1>
        </div>
        <button className="btn-outline" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="admin-toolbar">
        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
            Pending Quotes ({pendingQuotes.length})
          </button>
          <button className={`admin-tab ${activeTab === 'provided' ? 'active' : ''}`} onClick={() => setActiveTab('provided')}>
            Quote Provided ({providedQuotes.length})
          </button>
          <button className={`admin-tab ${activeTab === 'enquiry' ? 'active' : ''}`} onClick={() => setActiveTab('enquiry')}>
            Enquiry / Follow-up ({leadList.length})
          </button>
        </div>
        <input
          className="admin-input"
          style={{ maxWidth: 360 }}
          placeholder="Search by company, contact, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loadError && <div className="admin-empty">{loadError}</div>}

      {activeTab === 'pending' && (
        <section className="admin-section">
          {loading ? (
            <div className="admin-empty">Loading quote data...</div>
          ) : (
            <>
              {pendingFiltered.length === 0 && <div className="admin-empty">No pending quotes found.</div>}
              {pendingFiltered.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} onSend={handleSendQuote} onReopen={handleReopenQuote} />
              ))}
            </>
          )}
        </section>
      )}

      {activeTab === 'provided' && (
        <section className="admin-section">
          {loading ? (
            <div className="admin-empty">Loading quote data...</div>
          ) : (
            <>
              {providedFiltered.length === 0 && <div className="admin-empty">No provided quotes found.</div>}
              {providedFiltered.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} onSend={handleSendQuote} onReopen={handleReopenQuote} />
              ))}
            </>
          )}
        </section>
      )}

      {activeTab === 'enquiry' && (
        <section className="admin-section">
          {loading ? (
            <div className="admin-empty">Loading quote data...</div>
          ) : leadList.length === 0 ? (
            <div className="admin-empty">No enquiries or quote leads yet.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Company</th>
                    <th>Contact Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject / Lead</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leadList.map((row) => (
                    <tr key={row.id}>
                      <td>{formatDate(row.createdAt)}</td>
                      <td>{row.type}</td>
                      <td>{row.company}</td>
                      <td>{row.contactName}</td>
                      <td>{row.email}</td>
                      <td>{row.phone}</td>
                      <td>{row.subject}</td>
                      <td>
                        <span className="admin-badge" style={badgeStyle(row.status === 'provided' ? 'provided' : 'pending')}>
                          {String(row.status || '-').toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      <style>{`
        .admin-shell {
          width: min(1320px, calc(100vw - 32px));
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .admin-header {
          border: 1px solid var(--border-color);
          background: var(--surface-strong);
          padding: 18px;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }
        .admin-eyebrow {
          font-family: 'Manrope', sans-serif;
          color: #00ff88;
          letter-spacing: 1.6px;
          font-size: 11px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .admin-header h1 {
          margin: 0;
          font-family: 'Manrope', sans-serif;
          font-size: clamp(18px, 2.2vw, 28px);
          color: var(--text-primary);
        }
        .admin-toolbar {
          border: 1px solid var(--border-color);
          background: var(--surface-strong);
          padding: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: space-between;
          align-items: center;
        }
        .admin-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .admin-tab {
          border: 1px solid var(--border-color);
          background: var(--surface-medium);
          color: var(--text-secondary);
          padding: 10px 12px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
        }
        .admin-tab.active {
          border-color: #00ff88;
          color: #00ff88;
          box-shadow: 0 0 16px rgba(0, 255, 136, 0.2);
        }
        .admin-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .admin-empty {
          border: 1px dashed var(--border-color);
          color: var(--text-secondary);
          text-align: center;
          padding: 28px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 16px;
          background: var(--surface-medium);
        }
        .admin-quote-card {
          border: 1px solid var(--border-color);
          background: var(--surface-strong);
          padding: 14px;
        }
        .admin-quote-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
          margin-bottom: 12px;
        }
        .admin-quote-head h3 {
          margin: 0;
          font-family: 'Manrope', sans-serif;
          color: var(--text-primary);
          font-size: 16px;
        }
        .admin-quote-head p {
          margin: 6px 0 0;
          font-family: 'Source Sans 3', sans-serif;
          color: var(--text-secondary);
          font-size: 14px;
        }
        .admin-ref {
          font-family: 'Manrope', sans-serif;
          color: var(--text-subtle);
          font-size: 11px;
          letter-spacing: 1px;
        }
        .admin-badge {
          font-family: 'Manrope', sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          padding: 5px 8px;
        }
        .admin-quote-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .admin-subtitle {
          font-family: 'Manrope', sans-serif;
          color: var(--accent-teal);
          letter-spacing: 1px;
          font-size: 11px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .admin-meta {
          font-family: 'Source Sans 3', sans-serif;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 14px;
          line-height: 1.35;
        }
        .admin-response-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .admin-input {
          width: 100%;
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          padding: 10px 12px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .admin-input:focus {
          border-color: #00ff88;
          box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.12);
        }
        .admin-input-wide {
          grid-column: 1 / -1;
        }
        .admin-error {
          margin-top: 8px;
          color: #ff7e7e;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 13px;
        }
        .admin-actions {
          margin-top: 10px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .admin-timestamp {
          margin-top: 8px;
          color: var(--text-muted);
          font-family: 'Source Sans 3', sans-serif;
          font-size: 12px;
        }
        .admin-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--border-color);
          background: var(--surface-strong);
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 980px;
        }
        .admin-table th,
        .admin-table td {
          border-bottom: 1px solid var(--border-color);
          text-align: left;
          padding: 10px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          color: var(--text-secondary);
          white-space: nowrap;
        }
        .admin-table th {
          color: var(--text-primary);
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          background: var(--bg-surface);
          position: sticky;
          top: 0;
        }
        @media (max-width: 1100px) {
          .admin-quote-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 780px) {
          .admin-quote-grid {
            grid-template-columns: 1fr;
          }
          .admin-response-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}




