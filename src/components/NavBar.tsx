import { Link } from 'react-router-dom'
import { t } from '../tokens'
import puffinLogo from '../assets/puffin.png'

interface Props {
  memberName?: string
  onLogout?: () => void
}

export default function NavBar({ memberName, onLogout }: Props) {
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
      {/* Spacer to balance right side */}
      <div style={{ width: 120 }} />

      {/* Center: logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <img src={puffinLogo} alt="Run Club" style={{ width: 124, height: 124, objectFit: 'contain', display: 'block' }} />
      </Link>

      {/* Avatar + logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: 120, justifyContent: 'flex-end' }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: t.accentLight,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 12, color: t.accent,
        }}>
          {memberName ? memberName.slice(0, 2).toUpperCase() : '?'}
        </div>
        {onLogout && (
          <button onClick={onLogout} style={{
            background: 'transparent',
            border: `1px solid ${t.border}`,
            borderRadius: 100,
            padding: '5px 14px',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700, fontSize: 13,
            color: t.textSecondary, cursor: 'pointer',
          }}>
            Log out
          </button>
        )}
      </div>
    </nav>
  )
}
