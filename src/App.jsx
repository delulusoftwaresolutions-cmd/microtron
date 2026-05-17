import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Services from './pages/Services'
import Clients from './pages/Clients'
import Quote from './pages/Quote'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(media.matches)
    update()

    if (media.addEventListener) {
      media.addEventListener('change', update)
      return () => media.removeEventListener('change', update)
    }

    media.addListener(update)
    return () => media.removeListener(update)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    const move = (e) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX - 10 + 'px'; cursorRef.current.style.top = e.clientY - 10 + 'px' }
      if (dotRef.current) { dotRef.current.style.left = e.clientX - 3 + 'px'; dotRef.current.style.top = e.clientY - 3 + 'px' }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={cursorRef} style={{ width:20,height:20,border:'2px solid #00FF88',borderRadius:'50%',position:'fixed',pointerEvents:'none',zIndex:99999,transition:'left 0.08s ease,top 0.08s ease' }} />
      <div ref={dotRef} style={{ width:6,height:6,background:'#00FF88',borderRadius:'50%',position:'fixed',pointerEvents:'none',zIndex:99999,boxShadow:'0 0 8px #00FF88' }} />
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
