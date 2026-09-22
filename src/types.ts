export type ActivityType = 'run'
export type ReactionType = 'nice-one' | 'good-effort' | 'go-on' | 'heart'

export interface Activity {
  id: string
  memberId: string
  date: string
  distance: number
  note?: string
  reactions: { memberId: string; type: ReactionType }[]
}

export interface Member {
  id: string
  name: string
  target: number
  role: 'admin' | 'member'
  createdAt: string
}

export interface Goal {
  id: string
  title: string
  activityType: ActivityType
  unit: 'km'
  startsOn: string
  endsOn: string
  activities: Activity[]
}

export interface Few {
  id: string
  name: string
  members: Member[]
  currentGoal: Goal
}

export type Club = Few

export interface RunEntry {
  date: string
  distance: number
  note?: string
}

export type ProgressStatus = 'on-track' | 'ahead' | 'behind'
export type Milestone = 25 | 50 | 75 | 100
