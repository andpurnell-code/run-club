import { useState } from 'react'
import type { Club, Member } from '../types'
import { monthlyTarget, monthlyTotal, progressStatus, yearToDate } from '../lib/calculations'
import { t } from '../tokens'

interface Props {
  club: Club
  currentMember: Member
}

function initials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

function ClubTotalCard({ club }: { club: Club }) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const totalKm = club.members.reduce((sum, m) => sum + monthlyTotal(m, year, month), 0)
  const maxKm = Math.max(...club.members.map(m => monthlyTotal(m, year, month)), 1)

  return (
    <div style={{
      background: t.surface,
      borderRadius: t.radius.card,
      padding: '24px',
      boxShadow: t.shadow,
      marginBottom: 12,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.textTertiary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
        Club total — {now.toLocaleString('default', { month: 'long' })}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
        <span style={{ fontSize: 52, fontWeight: 900, color: t.text, lineHeight: 1 }}>{totalKm.toFixed(1)}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: t.accent }}>km</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {club.members.map(m => {
          const km = monthlyTotal(m, year, month)
          const pct = (km / maxKm) * 100
          return (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: t.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800, color: t.textSecondary, flexShrink: 0,
              }}>
                {initials(m.name)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {m.name}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, flexShrink: 0, marginLeft: 8 }}>
                    {km.toFixed(1)} km
                  </span>
                </div>
                <div style={{ height: 4, background: t.bg, borderRadius: 2 }}>
                  <div style={{
                    height: '100%', borderRadius: 2, background: t.accent,
                    width: `${pct}%`,
                    transition: 'width 900ms cubic-bezier(0.16,1,0.3,1)',
                  }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MemberCard({ member, isCurrentUser }: { member: Member; isCurrentUser: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const monthly = monthlyTotal(member, year, month)
  const target = monthlyTarget(member)
  const pct = target > 0 ? Math.round((monthly / target) * 100) : 0
  const ytd = yearToDate(member)
  const status = progressStatus(member, year, month)

  const statusColors = {
    ahead:      { bg: t.aheadBg,    color: t.aheadText },
    behind:     { bg: t.behindBg,   color: t.behindText },
    'on-track': { bg: t.onTrackBg,  color: t.onTrackText },
  }
  const sc = statusColors[status]

  return (
    <div
      onClick={() => setExpanded(e => !e)}
      style={{
        background: isCurrentUser ? t.accentLight : t.surface,
        border: isCurrentUser ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
        borderRadius: t.radius.cardSm,
        padding: '16px 20px',
        cursor: 'pointer',
        boxShadow: t.shadow,
        transition: 'transform 180ms, box-shadow 180ms',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = t.shadowMd
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = t.shadow
      }}
    >
      {/* Main row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: isCurrentUser ? t.accent : t.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 14,
          color: isCurrentUser ? '#fff' : t.textSecondary,
        }}>
          {initials(member.name)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: t.text }}>{member.name}</span>
            {isCurrentUser && (
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                background: t.accent, color: '#fff',
              }}>you</span>
            )}
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, marginLeft: 'auto',
              background: sc.bg, color: sc.color,
            }}>
              {status}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: t.bg, borderRadius: 2 }}>
            <div style={{
              height: '100%', borderRadius: 2, background: t.accent,
              width: `${Math.min(pct, 100)}%`,
              transition: 'width 900ms cubic-bezier(0.16,1,0.3,1)',
            }} />
          </div>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: t.text }}>{monthly.toFixed(1)}</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: t.textTertiary }}>km this month</div>
        </div>
      </div>

      {/* Expanded stats */}
      {expanded && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8, marginTop: 16, paddingTop: 16,
          borderTop: `1px solid ${t.border}`,
        }}>
          {[
            { label: 'YTD', value: `${ytd.toFixed(0)} km` },
            { label: 'Monthly target', value: `${target.toFixed(0)} km` },
            { label: 'Yearly goal', value: `${member.yearlyGoal} km` },
            { label: 'Progress', value: `${pct}%` },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: t.text }}>{value}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: t.textTertiary, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ClubPage({ club, currentMember }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: 20,
      padding: '28px 40px',
      maxWidth: 1200,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      {/* Sidebar */}
      <div>
        <ClubTotalCard club={club} />
      </div>

      {/* Member cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: t.textTertiary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
          Members · {club.members.length}
        </div>
        {club.members.map(m => (
          <MemberCard
            key={m.id}
            member={m}
            isCurrentUser={m.id === currentMember.id}
          />
        ))}
      </div>
    </div>
  )
}
