import { useState, useCallback } from 'react'
import type { Club, Member, RunEntry } from '../types'
import { loadClub, saveClub, getCurrentMemberId, setCurrentMemberId, clearCurrentMember } from '../lib/storage'

export function useRunClub() {
  const [club, setClub] = useState<Club>(() => loadClub())
  const [currentMemberId, setCurrentMemberIdState] = useState<string | null>(() => getCurrentMemberId())
  const currentMember = club.members.find(m => m.id === currentMemberId) ?? null

  const login = useCallback((name: string, target = 30) => {
    const existing = club.members.find(m => m.name.toLowerCase() === name.toLowerCase())
    if (existing) {
      setCurrentMemberId(existing.id)
      setCurrentMemberIdState(existing.id)
      return
    }
    if (club.members.length >= 8) throw new Error('This Few is full.')
    const newMember: Member = {
      id: Math.random().toString(36).slice(2, 9), name, target,
      role: 'member', createdAt: new Date().toISOString(),
    }
    const updated = { ...club, members: [...club.members, newMember] }
    saveClub(updated); setClub(updated); setCurrentMemberId(newMember.id); setCurrentMemberIdState(newMember.id)
  }, [club])

  const logout = useCallback(() => { clearCurrentMember(); setCurrentMemberIdState(null) }, [])

  const logRun = useCallback((memberId: string, entry: RunEntry) => {
    const nextActivity = {
      id: Math.random().toString(36).slice(2, 9), memberId, date: entry.date,
      distance: entry.distance, note: entry.note, reactions: [],
    }
    const updated = {
      ...club,
      currentGoal: { ...club.currentGoal, activities: [...club.currentGoal.activities, nextActivity] },
    }
    saveClub(updated); setClub(updated)
  }, [club])

  const react = useCallback((activityId: string, memberId: string) => {
    const updated = {
      ...club,
      currentGoal: {
        ...club.currentGoal,
        activities: club.currentGoal.activities.map(a => a.id === activityId
          ? { ...a, reactions: [...a.reactions.filter(r => r.memberId !== memberId), { memberId, type: 'nice-one' as const }] }
          : a),
      },
    }
    saveClub(updated); setClub(updated)
  }, [club])

  return { club, currentMember, login, logout, logRun, react }
}
