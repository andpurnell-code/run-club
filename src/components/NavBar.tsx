import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { t } from '../tokens'
import puffinLogo from '../assets/puffin.png'

interface Props {
  memberName?: string
  onLogout?: () => void
}

export default function NavBar({ memberName, onLogout }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav style={{
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 40px 16px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Spacer */}
      <div style={{ width: 120 }} />

      {/* Center: logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <img src={puffinLogo} alt="Run Club" style={{ width: 124, height: 124, objectFit: 'contain', display: 'block' }} />
      </Link>

      {/* Avatar with dropdown */}
      <div ref={menuRef} style={{ width: 120, display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: t.accentGradient,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13,
            color: '#fff',
            boxShadow: menuOpen ? '0 0 0 3px rgba(124,106,247,0.2)' : 'none',
            transition: 'box-shadow 180ms',
          }}
        >
          {memberName ? memberName.slice(0, 2).toUpperCase() : '?'}
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute', top: 48, right: 0,
            background: t.surface,
            borderRadius: 12,
            boxShadow: t.shadowMd,
            border: `1px solid ${t.border}`,
            overflow: 'hidden',
            minWidth: 140,
          }}>
            <div style={{ padding: '10px 14px 8px', borderBottom: `1px solid ${t.border}` }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: t.text }}>{memberName}</div>
            </div>
            <button
              onClick={() => { setMenuOpen(false); onLogout?.() }}
              style={{
                width: '100%', padding: '10px 14px',
                background: 'none', border: 'none',
                textAlign: 'left', cursor: 'pointer',
                fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13,
                color: t.textSecondary,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = t.bg)}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
