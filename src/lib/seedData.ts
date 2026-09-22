import type { Few, Activity } from '../types'

const activity = (id: string, memberId: string, date: string, distance: number, note?: string): Activity => ({
  id, memberId, date, distance, note, reactions: [],
})

export function createSeedData(): Few {
  return {
    id: 'sunday-runners',
    name: 'Sunday Runners',
    members: [
      { id: 'andrew', name: 'Andrew', target: 50, role: 'admin', createdAt: '2026-09-01' },
      { id: 'gregor', name: 'Gregor', target: 80, role: 'member', createdAt: '2026-09-01' },
      { id: 'sarah', name: 'Sarah', target: 30, role: 'member', createdAt: '2026-09-02' },
      { id: 'lisa', name: 'Lisa', target: 40, role: 'member', createdAt: '2026-09-03' },
    ],
    currentGoal: {
      id: 'september-run',
      title: 'September Runners',
      activityType: 'run',
      unit: 'km',
      startsOn: '2026-09-01',
      endsOn: '2026-09-30',
      activities: [
        activity('a1', 'andrew', '2026-09-02', 5.1, 'First one in.'),
        activity('a2', 'andrew', '2026-09-08', 7.0, 'Good morning for it.'),
        activity('a3', 'andrew', '2026-09-14', 8.2),
        activity('a4', 'andrew', '2026-09-21', 12.1, 'Nearly talked myself out of it.'),
        activity('g1', 'gregor', '2026-09-04', 10.0),
        activity('g2', 'gregor', '2026-09-10', 12.2),
        activity('g3', 'gregor', '2026-09-16', 16.0),
        activity('g4', 'gregor', '2026-09-22', 8.0, 'Wet one today.'),
        activity('s1', 'sarah', '2026-09-03', 7.4),
        activity('s2', 'sarah', '2026-09-09', 8.0),
        activity('s3', 'sarah', '2026-09-15', 9.4),
        activity('s4', 'sarah', '2026-09-22', 5.2, 'Lunch run. Done.'),
        activity('l1', 'lisa', '2026-09-05', 6.2),
        activity('l2', 'lisa', '2026-09-12', 7.5),
        activity('l3', 'lisa', '2026-09-20', 8.0),
      ],
    },
  }
}
