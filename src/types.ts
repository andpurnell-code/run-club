export interface RunEntry {
  date: string     // YYYY-MM-DD
  distance: number // kilometres
}

export interface Member {
  id: string
  name: string
  yearlyGoal: number
  runs: RunEntry[]
  createdAt: string
}

export interface Club {
  id: string
  name: string
  members: Member[]
}

export type ProgressStatus = 'on-track' | 'ahead' | 'behind'
export type Milestone = 25 | 50 | 75 | 100
