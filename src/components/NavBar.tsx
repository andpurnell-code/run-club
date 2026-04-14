import { Link, useLocation } from 'react-router-dom'
import { t } from '../tokens'
import puffinLogo from '../assets/puffin.png'

interface Props {
  memberName?: string
  onLogout?: () => void
}

export default function NavBar({ memberName, onLogout }: Props) {
  const location = useLocation()

  return (
    <nav style={{
      height: 88,
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 104, height: 104, overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={puffinLogo}
            alt="Run Club"
            style={{
              width: '140%',
              height: '140%',
              objectFit: 'cover',
              marginLeft: '-18%',
              marginTop: '-10%',
            }}
          />
        </div>
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
