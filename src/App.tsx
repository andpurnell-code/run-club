import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import ClubPage from './pages/Club'
import LogRunModal from './components/LogRunModal'
import SplashScreen from './components/SplashScreen'
import { useRunClub } from './hooks/useRunClub'
import { t } from './tokens'
import './index.css'

function PageToggle() {
  const location = useLocation()
  return (
    <div style={{ padding: '16px 40px 0', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box' }}>
      <div style={{ display: 'inline-flex', background: t.bg, borderRadius: 12, padding: 4, gap: 2 }}>
        {[{ label: 'Dashboard', to: '/' }, { label: 'Club', to: '/club' }].map(({ label, to }) => {
          const active = location.pathname === to
          return (
            <Link key={to} to={to} style={{
              textDecoration: 'none',
              padding: '6px 18px',
              borderRadius: 9,
              fontWeight: 700,
              fontSize: 14,
              color: active ? t.text : t.textSecondary,
              background: active ? t.surface : 'transparent',
              boxShadow: active ? t.shadow : 'none',
              transition: 'all 180ms',
            }}>
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  const { club, currentMember, logout, logRun } = useRunClub()
  const [modalDate, setModalDate] = useState<string | null>(null)
  const [showSplash, setShowSplash] = useState(true)

  // Temporary: auto-login as first member (login screen comes next)
  const member = currentMember ?? club.members[0]

  function openModal(date?: string) {
    setModalDate(date ?? new Date().toISOString().slice(0, 10))
  }

  function handleSave(date: string, distance: number) {
    logRun(member.id, { date, distance })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <NavBar memberName={member.name} onLogout={logout} />
      <PageToggle />
      <Routes>
        <Route path="/" element={<Dashboard member={member} onLogRun={openModal} />} />
        <Route path="/club" element={<ClubPage club={club} currentMember={member} />} />
      </Routes>

      {/* FAB */}
      <button
        onClick={() => openModal()}
        style={{
          position: 'fixed', bottom: 32, right: 32,
          width: 58, height: 58, borderRadius: '50%',
          background: t.accentGradient, border: 'none',
          color: '#fff', fontSize: 28, cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(124,106,247,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 180ms, box-shadow 180ms',
          zIndex: 100,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'scale(1.1) translateY(-2px)'
          el.style.boxShadow = '0 8px 28px rgba(124,106,247,0.5)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'scale(1)'
          el.style.boxShadow = '0 4px 16px rgba(124,106,247,0.35)'
        }}
      >
        +
      </button>

      {modalDate && (
        <LogRunModal
          member={member}
          initialDate={modalDate}
          onSave={handleSave}
          onClose={() => setModalDate(null)}
        />
      )}
    </div>
  )
}
