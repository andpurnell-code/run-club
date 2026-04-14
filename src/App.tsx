import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import ClubPage from './pages/Club'
import LogRunModal from './components/LogRunModal'
import { useRunClub } from './hooks/useRunClub'
import { t } from './tokens'
import './index.css'

export default function App() {
  const { club, currentMember, logout, logRun } = useRunClub()
  const [modalDate, setModalDate] = useState<string | null>(null)

  // Temporary: auto-login as first member (login screen comes next)
  const member = currentMember ?? club.members[0]

  function openModal(date?: string) {
    setModalDate(date ?? new Date().toISOString().slice(0, 10))
  }

  function handleSave(date: string, distance: number) {
    logRun(member.id, { date, distance })
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>
      <NavBar memberName={member.name} onLogout={logout} />
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
