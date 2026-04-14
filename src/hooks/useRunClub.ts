import { useState, useCallback } from 'react'
import type { Club, Member, RunEntry } from '../types'
import { loadClub, saveClub, getCurrentMemberId, setCurrentMemberId, clearCurrentMember } from '../lib/storage'

export function useRunClub() {
  const [club, setClub] = useState<Club>(() => loadClub())
  const [currentMemberId, setCurrentMemberIdState] = useState<string | null>(() => getCurrentMemberId())

  const currentMember = club.members.find(m => m.id === currentMemberId) ?? null

  const login = useCallback((name: string, yearlyGoal: number) => {
    const existing = club.members.find(m => m.name.toLowerCase() === name.toLowerCase())
    if (existing) {
      setCurrentMemberId(existing.id)
      setCurrentMemberIdState(existing.id)
      return
    }
    const newMember: Member = {
      id: Math.random().toString(36).slice(2, 9),
      name,
      yearlyGoal,
      runs: [],
      createdAt: new Date().toISOString(),
    }
    const updated = { ...club, members: [...club.members, newMember] }
    saveClub(updated)
    setClub(updated)
    setCurrentMemberId(newMember.id)
    setCurrentMemberIdState(newMember.id)
  }, [club])

  const logout = useCallback(() => {
    clearCurrentMember()
    setCurrentMemberIdState(null)
  }, [])

  const logRun = useCallback((memberId: string, entry: RunEntry) => {
    const updated = {
      ...club,
      members: club.members.map(m => {
        if (m.id !== memberId) return m
        const filtered = m.runs.filter(r => r.date !== entry.date)
        const runs = entry.distance > 0 ? [...filtered, entry] : filtered
        return { ...m, runs }
      }),
    }
    saveClub(updated)
    setClub(updated)
  }, [club])

  return { club, currentMember, login, logout, logRun }
}
