import { useState } from 'react'
import type { Member } from '../../types'
import { daysInMonth } from '../../lib/calculations'
import { t } from '../../tokens'

interface Props {
  member: Member
  onDayClick: (date: string) => void
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function ActivityCalendar({ member, onDayClick }: Props) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'short' })
  const totalDays = daysInMonth(viewYear, viewMonth)
  const firstDow = new Date(viewYear, viewMonth, 1).getDay()

  const runMap = new Map(
    member.runs
      .filter(r => {
        const d = new Date(r.date)
        return d.getFullYear() === viewYear && d.getMonth() === viewMonth
      })
      .map(r => [r.date, r.distance])
  )

  const todayStr = today.toISOString().slice(0, 10)

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  return (
    <div style={{
      background: t.surface,
      borderRadius: t.radius.card,
      padding: '22px 24px',
      boxShadow: t.shadow,
      height: '100%',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: t.textTertiary, letterSpacing: 1, textTransform: 'uppercase' }}>Activity</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={prevMonth} style={navBtnStyle}>←</button>
          <span style={{ fontWeight: 700, fontSize: 14, color: t.text, minWidth: 72, textAlign: 'center' }}>
            {monthName} {viewYear}
          </span>
          <button onClick={nextMonth} style={navBtnStyle}>→</button>
        </div>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
        {DAY_LABELS.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: t.textTertiary, padding: '2px 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const dist = runMap.get(dateStr)
          const isToday = dateStr === todayStr
          const hasRun = dist !== undefined

          let bg = t.bg
          let color = t.textSecondary
          let border = 'none'
          let textColor = t.textSecondary

          if (hasRun) {
            bg = t.cardDark
            color = '#fff'
            textColor = '#fff'
          } else if (isToday) {
            bg = t.accentLight
            color = t.accent
            textColor = t.accent
            border = `2px solid ${t.accent}`
          }

          return (
            <button
              key={i}
              onClick={() => onDayClick(dateStr)}
              style={{
                background: bg, color, border,
                borderRadius: t.radius.day,
                padding: '6px 4px',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700, fontSize: 13,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 1,
                aspectRatio: '1',
                justifyContent: 'center',
                transition: 'transform 120ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >
              <span style={{ color: textColor }}>{day}</span>
              {hasRun && (
                <span style={{ fontSize: 9, fontWeight: 600, color: t.accentMid }}>
                  {dist!.toFixed(1)}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const navBtnStyle: React.CSSProperties = {
  width: 28, height: 28, borderRadius: 8,
  background: '#F2F2F7', border: 'none',
  fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13,
  cursor: 'pointer', color: '#6B7280',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
