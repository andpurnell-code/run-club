import type { Club } from '../types'
import { createSeedData } from './seedData'

const CLUB_KEY = 'runclub-data'
const CURRENT_KEY = 'runclub-current'

export function loadClub(): Club {
  const raw = localStorage.getItem(CLUB_KEY)
  if (raw) return JSON.parse(raw)
  const seed = createSeedData()
  saveClub(seed)
  return seed
}

export function saveClub(club: Club): void {
  localStorage.setItem(CLUB_KEY, JSON.stringify(club))
}

export function getCurrentMemberId(): string | null {
  return localStorage.getItem(CURRENT_KEY)
}

export function setCurrentMemberId(id: string): void {
  localStorage.setItem(CURRENT_KEY, id)
}

export function clearCurrentMember(): void {
  localStorage.removeItem(CURRENT_KEY)
}
