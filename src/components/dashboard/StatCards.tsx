import type { Member } from '../../types'
import { streak, yearToDate } from '../../lib/calculations'
import { t } from '../../tokens'

export function StreakCard({ member }: { member: Member }) {
  const days = streak(member)
  return (
    <div style={{
      background: t.surface,
      borderRadius: t.radius.cardSm,
      padding: '20px 22px',
      flex: 1,
      boxShadow: t.shadow,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.textTertiary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
        Streak
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
        <span style={{ fontSize: 44, fontWeight: 900, color: t.text, lineHeight: 1 }}>{days}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: t.textSecondary }}>days</span>
      </div>
    </div>
  )
}

export function YTDCard({ member }: { member: Member }) {
  const ytd = yearToDate(member)
  const pct = Math.round((ytd / member.yearlyGoal) * 100)
  return (
    <div style={{
      background: t.surface,
      borderRadius: t.radius.cardSm,
      padding: '20px 22px',
      flex: 1,
      boxShadow: t.shadow,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.textTertiary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
        Year to date
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontSize: 44, fontWeight: 900, color: t.text, lineHeight: 1 }}>{ytd.toFixed(1)}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: t.accent }}>km</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary, marginTop: 4 }}>
        {pct}% of {member.yearlyGoal} km goal
      </div>
    </div>
  )
}
