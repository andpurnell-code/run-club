import { useState, useEffect } from 'react'
import type { Member } from '../types'
import { t } from '../tokens'

interface Props {
  member: Member
  initialDate?: string
  onSave: (date: string, distance: number) => void
  onClose: () => void
}

export default function LogRunModal({ member, initialDate, onSave, onClose }: Props) {
  const today = new Date().toISOString().slice(0, 10)
  const [date, setDate] = useState(initialDate ?? today)
  const [distance, setDistance] = useState('')

  const existing = member.runs.find(r => r.date === date)
  useEffect(() => {
    setDistance(existing ? String(existing.distance) : '')
  }, [date])

  const isEdit = !!existing
  const dist = parseFloat(distance)
  const canSave = !isNaN(dist) && dist > 0

  function handleSave() {
    if (!canSave) return
    onSave(date, dist)
    onClose()
  }

  function handleDelete() {
    onSave(date, 0)
    onClose()
  }

  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200,
        animation: 'fadeIn 200ms ease-out',
      }}
    >
      <div style={{
        background: t.surface,
        borderRadius: 24,
        borderTop: `4px solid transparent`,
        backgroundImage: `linear-gradient(${t.surface}, ${t.surface}), ${t.accentGradient}`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        padding: '28px 28px 24px',
        width: '100%', maxWidth: 360,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        animation: 'popIn 220ms ease-out',
        fontFamily: 'Nunito, sans-serif',
      }}>
        <h2 style={{ fontWeight: 800, fontSize: 20, color: t.text, marginBottom: 22 }}>
          {isEdit ? 'Edit run' : 'Log a run'}
        </h2>

        <label style={labelStyle}>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Distance (km)</label>
        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="0.0"
          value={distance}
          onChange={e => setDistance(e.target.value)}
          autoFocus
          style={{ ...inputStyle, fontSize: 32, fontWeight: 900, color: t.text, textAlign: 'center' }}
        />

        <button
          onClick={handleSave}
          disabled={!canSave}
          style={{
            width: '100%', padding: '13px 0', borderRadius: t.radius.btn,
            background: canSave ? t.accentGradient : t.bg,
            color: canSave ? '#fff' : t.textTertiary,
            border: 'none', fontFamily: 'Nunito, sans-serif',
            fontWeight: 700, fontSize: 15,
            cursor: canSave ? 'pointer' : 'default',
            marginTop: 4, transition: 'background 180ms',
          }}
        >
          Save run
        </button>

        {isEdit && (
          <button
            onClick={handleDelete}
            style={{
              width: '100%', padding: '11px 0', borderRadius: t.radius.btn, marginTop: 10,
              background: t.bg, border: 'none',
              fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14,
              color: t.textSecondary, cursor: 'pointer',
            }}
          >
            Delete run
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.93) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 700,
  color: '#AEAEB2', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 12,
  border: `1.5px solid ${t.border}`,
  fontFamily: 'Nunito, sans-serif', fontWeight: 700,
  fontSize: 15, color: t.text,
  background: t.bg, marginBottom: 16,
  outline: 'none', boxSizing: 'border-box',
}
