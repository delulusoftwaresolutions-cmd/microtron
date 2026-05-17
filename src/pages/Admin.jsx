import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AdminDashboard from './AdminDashboard'
import { getAdminSession, setAdminSession, validateAdminCredentials } from '../utils/adminStore'

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    setLoggedIn(getAdminSession())
  }, [])

  const login = (e) => {
    e.preventDefault()
    const ok = validateAdminCredentials(form.username.trim(), form.password)
    if (!ok) {
      setError('Invalid username or password.')
      return
    }
    setError('')
    setAdminSession(true)
    setLoggedIn(true)
  }

  const logout = () => {
    setAdminSession(false)
    setLoggedIn(false)
    setForm({ username: '', password: '' })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <section className="admin-page" style={{ minHeight: '100vh', paddingTop: 96, paddingBottom: 36, background: 'var(--bg-primary)' }}>
        <div className="circuit-bg" />

        {!loggedIn ? (
          <div className="admin-login-shell">
            <div className="admin-login-card">
              <div className="admin-login-eyebrow">Admin Access</div>
              <h1>Login As Admin</h1>
              <p>Use this page to manage pending quotes, quote responses, and enquiry follow-ups.</p>

              <form onSubmit={login} className="admin-login-form">
                <div>
                  <label>Username</label>
                  <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Enter username" />
                </div>
                <div>
                  <label>Password</label>
                  <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter password" />
                </div>
                {error && <div className="admin-login-error">{error}</div>}
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                  Login
                </button>
              </form>

              <div className="admin-login-note">
                Demo credentials (frontend only): <strong>admin</strong> / <strong>admin123</strong>
              </div>
            </div>
          </div>
        ) : (
          <AdminDashboard onLogout={logout} />
        )}
      </section>

      <style>{`
        .admin-login-shell {
          width: min(520px, calc(100vw - 32px));
          margin: 0 auto;
        }
        .admin-login-card {
          border: 1px solid var(--border-color);
          background: var(--surface-strong);
          padding: 24px;
        }
        .admin-login-eyebrow {
          font-family: 'Manrope', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: #00ff88;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .admin-login-card h1 {
          margin: 0;
          color: var(--text-primary);
          font-family: 'Manrope', sans-serif;
          font-size: 28px;
        }
        .admin-login-card p {
          margin: 12px 0 20px;
          color: var(--text-secondary);
          font-family: 'Source Sans 3', sans-serif;
          line-height: 1.55;
          font-size: 15px;
        }
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .admin-login-form label {
          display: block;
          margin-bottom: 6px;
          color: var(--text-secondary);
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          letter-spacing: 0.5px;
        }
        .admin-login-form input {
          width: 100%;
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          padding: 11px 12px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 15px;
          outline: none;
        }
        .admin-login-form input:focus {
          border-color: #00ff88;
          box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.12);
        }
        .admin-login-error {
          color: #ff7e7e;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
        }
        .admin-login-note {
          margin-top: 16px;
          padding: 10px 12px;
          border: 1px solid rgba(0, 212, 255, 0.25);
          color: var(--text-secondary);
          background: rgba(0, 212, 255, 0.08);
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
        }
      `}</style>
    </motion.div>
  )
}




