import type { Member, ProgressStatus, Milestone } from '../types'

export function monthlyTarget(member: Member): number {
  return member.yearlyGoal / 12
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function expectedByNow(member: Member, year: number, month: number): number {
  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month
  const total = daysInMonth(year, month)
  const day = isCurrentMonth ? today.getDate() : total
  return monthlyTarget(member) * (day / total)
}

export function monthlyTotal(member: Member, year: number, month: number): number {
  return member.runs
    .filter(r => {
      const d = new Date(r.date)
      return d.getFullYear() === year && d.getMonth() === month
    })
    .reduce((sum, r) => sum + r.distance, 0)
}

export function progressStatus(member: Member, year: number, month: number): ProgressStatus {
  const actual = monthlyTotal(member, year, month)
  const expected = expectedByNow(member, year, month)
  if (expected === 0) return 'on-track'
  const ratio = actual / expected
  if (ratio > 1.05) return 'ahead'
  if (ratio < 0.95) return 'behind'
  return 'on-track'
}

export function streak(member: Member): number {
  const today = new Date()
  let count = 0
  const d = new Date(today)
  while (true) {
    const dateStr = d.toISOString().slice(0, 10)
    const hasRun = member.runs.some(r => r.date === dateStr && r.distance > 0)
    if (!hasRun) break
    count++
    d.setDate(d.getDate() - 1)
  }
  return count
}

export function yearToDate(member: Member): number {
  const year = new Date().getFullYear()
  return member.runs
    .filter(r => r.date.startsWith(String(year)))
    .reduce((sum, r) => sum + r.distance, 0)
}

export function checkMilestones(
  prevTotal: number,
  newTotal: number,
  target: number
): Milestone[] {
  if (target === 0) return []
  const milestones: Milestone[] = [25, 50, 75, 100]
  const prevPct = (prevTotal / target) * 100
  const newPct = (newTotal / target) * 100
  return milestones.filter(m => prevPct < m && newPct >= m)
}
