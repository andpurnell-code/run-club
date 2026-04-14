import type { Member } from '../types'
import MonthlyChallenge from '../components/dashboard/MonthlyChallenge'
import { StreakCard, YTDCard } from '../components/dashboard/StatCards'
import ActivityCalendar from '../components/dashboard/ActivityCalendar'

interface Props {
  member: Member
  onLogRun: (date?: string) => void
}

export default function Dashboard({ member, onLogRun }: Props) {
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
      {/* Left column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <MonthlyChallenge member={member} onLogRun={() => onLogRun()} />
        <div style={{ display: 'flex', gap: 16 }}>
          <StreakCard member={member} />
          <YTDCard member={member} />
        </div>
      </div>

      {/* Right column */}
      <ActivityCalendar member={member} onDayClick={(date) => onLogRun(date)} />
    </div>
  )
}
