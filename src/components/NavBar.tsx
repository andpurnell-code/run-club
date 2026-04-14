import { Link, useLocation } from 'react-router-dom'
import { t } from '../tokens'

interface Props {
  memberName?: string
  onLogout?: () => void
}

export default function NavBar({ memberName, onLogout }: Props) {
  const location = useLocation()

  return (
    <nav style={{
      height: 64,
      background: t.surface,
      borderBottom: `1px solid ${t.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <circle cx="20" cy="5" r="3" fill={t.text} />
          <path d="M14 10 L18 8 L22 13 L26 11" stroke={t.text} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M18 8 L16 16 L12 20" stroke={t.text} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M16 16 L20 21 L18 27" stroke={t.text} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.3 }}>
          <span style={{ color: t.text }}>Run</span>
          <span style={{ color: t.accent }}>Club</span>
        </span>
      </Link>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        background: t.bg,
        borderRadius: 12,
        padding: 4,
        gap: 2,
      }}>
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

      {/* Avatar + logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
