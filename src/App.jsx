import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Services from './pages/Services'
import Clients from './pages/Clients'
import Quote from './pages/Quote'
import Contact from './pages/Contact'

function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX - 10 + 'px'; cursorRef.current.style.top = e.clientY - 10 + 'px' }
      if (dotRef.current) { dotRef.current.style.left = e.clientX - 3 + 'px'; dotRef.current.style.top = e.clientY - 3 + 'px' }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
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
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
