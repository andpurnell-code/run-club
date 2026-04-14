import { useEffect, useState } from 'react'
import type { Member, ProgressStatus } from '../../types'
import { monthlyTarget, monthlyTotal, progressStatus, expectedByNow, daysInMonth } from '../../lib/calculations'
import { t } from '../../tokens'

interface Props {
  member: Member
  onLogRun: () => void
}

const STATUS_STYLES: Record<ProgressStatus, { bg: string; color: string; label: string }> = {
  ahead:      { bg: t.aheadBg,   color: t.aheadText,   label: 'Ahead' },
  behind:     { bg: t.behindBg,  color: t.behindText,  label: 'Behind' },
  'on-track': { bg: 'rgba(255,255,255,0.15)', color: '#fff', label: 'On track' },
}

function ArcRing({ pct, display, target }: { pct: number; display: number; target: number }) {
  const size = 130
  const stroke = 9
  const r = (size - stroke) / 2
  const cx = size / 2
  const cy = size / 2
  const startAngle = 150
  const totalArc = 240
  const filled = Math.min(pct / 100, 1) * totalArc

  function polarToXY(deg: number) {
    const rad = (deg - 90) * (Math.PI / 180)
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  function arc(startDeg: number, endDeg: number) {
    const s = polarToXY(startDeg)
    const e = polarToXY(endDeg)
    const large = endDeg - startDeg > 180 ? 1 : 0
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
  }

  const [animated, setAnimated] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const duration = 1200
    function frame(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setAnimated(display * ease)
      if (t < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [display])

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size}>
        <path d={arc(startAngle, startAngle + totalArc)} fill="none"
          stroke={t.bg} strokeWidth={stroke} strokeLinecap="round" />
        {filled > 0 && (
          <path d={arc(startAngle, startAngle + filled)} fill="none"
            stroke={t.accent} strokeWidth={stroke} strokeLinecap="round" />
        )}
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontWeight: 900, fontSize: 26, color: t.text, lineHeight: 1 }}>
          {animated.toFixed(1)}
        </span>
        <span style={{ fontSize: 11, color: t.textTertiary, fontWeight: 600, marginTop: 2 }}>
          / {target.toFixed(0)} km
        </span>
      </div>
    </div>
  )
}

export default function MonthlyChallenge({ member, onLogRun }: Props) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const monthName = now.toLocaleString('default', { month: 'long' })

  const target = monthlyTarget(member)
  const total = monthlyTotal(member, year, month)
  const expected = expectedByNow(member, year, month)
  const status = progressStatus(member, year, month)
  const pct = target > 0 ? (total / target) * 100 : 0
  const days = daysInMonth(year, month)
  const remaining = days - now.getDate()
  const kmToGo = Math.max(target - total, 0)

  const statusStyle = STATUS_STYLES[status]

  return (
    <div style={{
      background: t.surface,
      borderRadius: t.radius.card,
      padding: '22px 24px',
      position: 'relative',
      boxShadow: t.shadow,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: t.textTertiary, letterSpacing: 1, textTransform: 'uppercase' }}>
          {monthName} Challenge
        </span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
          background: statusStyle.bg, color: statusStyle.color,
        }}>
          {statusStyle.label}
        </span>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <ArcRing pct={pct} display={total} target={target} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: t.textSecondary }}>
              {remaining} days remaining
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: t.textSecondary }}>
              {kmToGo.toFixed(1)} km to go
            </span>
          </div>

          {/* Progress bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: t.textTertiary }}>Progress</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: t.accent }}>{Math.round(pct)}%</span>
            </div>
            <div style={{ height: 5, background: t.bg, borderRadius: 3 }}>
              <div style={{
                height: '100%', borderRadius: 3, background: t.accent,
                width: `${Math.min(pct, 100)}%`,
                transition: 'width 900ms cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>
          </div>

          <button onClick={onLogRun} style={{
            background: t.text,
            color: '#fff',
            border: 'none', borderRadius: t.radius.btn, padding: '10px 0',
            fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14,
            cursor: 'pointer', width: '100%',
            transition: 'opacity 180ms',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            + Log a run
          </button>
        </div>
      </div>
    </div>
  )
}
