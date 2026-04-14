import type { Club } from '../types'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function run(date: string, distance: number) {
  return { date, distance }
}

export function createSeedData(): Club {
  return {
    id: uid(),
    name: 'Run Club',
    members: [
      {
        id: uid(),
        name: 'Alex N',
        yearlyGoal: 500,
        createdAt: new Date('2026-01-01').toISOString(),
        runs: [
          // Jan
          run('2026-01-03', 5.2), run('2026-01-07', 6.0), run('2026-01-10', 4.8),
          run('2026-01-14', 7.1), run('2026-01-18', 5.5), run('2026-01-22', 6.3),
          run('2026-01-26', 5.0), run('2026-01-29', 4.5),
          // Feb
          run('2026-02-02', 6.2), run('2026-02-06', 5.8), run('2026-02-10', 7.0),
          run('2026-02-14', 6.5), run('2026-02-18', 5.2), run('2026-02-22', 6.8),
          run('2026-02-26', 5.5),
          // Mar
          run('2026-03-01', 7.0), run('2026-03-05', 6.2), run('2026-03-10', 8.5),
        ],
      },
      {
        id: uid(),
        name: 'Sam K',
        yearlyGoal: 365,
        createdAt: new Date('2026-01-01').toISOString(),
        runs: [
          // Jan
          run('2026-01-05', 4.0), run('2026-01-12', 3.8), run('2026-01-19', 4.2),
          run('2026-01-26', 3.5),
          // Feb
          run('2026-02-04', 4.5), run('2026-02-11', 3.9), run('2026-02-18', 4.1),
          run('2026-02-25', 4.8),
          // Mar
          run('2026-03-04', 4.2), run('2026-03-11', 3.8), run('2026-03-18', 4.5),
        ],
      },
      {
        id: uid(),
        name: 'Jordan M',
        yearlyGoal: 700,
        createdAt: new Date('2026-01-01').toISOString(),
        runs: [
          // Jan
          run('2026-01-02', 8.0), run('2026-01-04', 7.5), run('2026-01-07', 9.0),
          run('2026-01-09', 6.8), run('2026-01-12', 8.5), run('2026-01-14', 7.2),
          run('2026-01-17', 9.5), run('2026-01-20', 8.0), run('2026-01-23', 7.8),
          run('2026-01-26', 8.3), run('2026-01-29', 9.0),
          // Feb
          run('2026-02-02', 8.5), run('2026-02-05', 7.0), run('2026-02-08', 9.2),
          run('2026-02-11', 8.0), run('2026-02-14', 7.5), run('2026-02-17', 9.0),
          run('2026-02-20', 8.2), run('2026-02-23', 7.8), run('2026-02-26', 8.5),
          // Mar
          run('2026-03-02', 9.0), run('2026-03-05', 8.5), run('2026-03-08', 7.8),
          run('2026-03-12', 9.2), run('2026-03-15', 8.0), run('2026-03-19', 9.5),
          run('2026-03-22', 8.3),
        ],
      },
      {
        id: uid(),
        name: 'Riley P',
        yearlyGoal: 400,
        createdAt: new Date('2026-01-01').toISOString(),
        runs: [
          // Jan
          run('2026-01-08', 3.5), run('2026-01-16', 4.0), run('2026-01-24', 3.2),
          // Feb
          run('2026-02-07', 3.8), run('2026-02-15', 4.2), run('2026-02-23', 3.5),
          // Mar
          run('2026-03-07', 4.0), run('2026-03-14', 3.8),
        ],
      },
    ],
  }
}
