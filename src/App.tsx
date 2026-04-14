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
    <div style={{ padding: '16px 40px 0', maxWidth: 860, margin: '0 auto', boxSizing: 'border-box' }}>
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
