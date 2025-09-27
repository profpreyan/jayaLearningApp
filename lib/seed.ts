import { formatISO, getWeekBoundsIST, nowIST, isUnlockTimeForDay, weeklyUnlockTime } from './time'

export type DayStatus = 'pending'|'submitted'|'evaluated'
export type DailyAssignment = { dayNo: 1|2|3|4|5; dayName: 'Monday'|'Tuesday'|'Wednesday'|'Thursday'|'Friday'; dateISO: string; title: string; status: DayStatus; links: { customGptUrl: string; notebookLmUrl: string }; extraVideosLocked: boolean }
export type WeeklyAssignment = { weekNo: number; startISO: string; endISO: string; title: string; status: DayStatus; lockedUntilISO: string }
export type DashboardState = { coins: number; badges: number; streakDays: number; onStreak: boolean; daily: DailyAssignment[]; weekly: WeeklyAssignment; _locks?: { [k: string]: boolean } }

export function seedWeek(): DashboardState {
  const now = nowIST()
  const { start, end } = getWeekBoundsIST(now)
  const dayNames: DailyAssignment['dayName'][] = ['Monday','Tuesday','Wednesday','Thursday','Friday']
  const daily: DailyAssignment[] = dayNames.map((name, i) => ({
    dayNo: (i+1) as any,
    dayName: name,
    dateISO: formatISO(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)),
    title: `Day ${i+1} assignment`,
    status: 'pending',
    links: { customGptUrl: '#', notebookLmUrl: '#' },
    extraVideosLocked: true,
  }))
  const weekly: WeeklyAssignment = {
    weekNo: weekNumber(now),
    startISO: formatISO(start),
    endISO: formatISO(end),
    title: 'Weekly assignment',
    status: 'pending',
    lockedUntilISO: formatISO(new Date(start.getFullYear(), start.getMonth(), start.getDate() + 5)),
  }

  const locks: Record<string, boolean> = {
    day1: !isUnlockTimeForDay(0, now),
    day2: !isUnlockTimeForDay(1, now),
    day3: !isUnlockTimeForDay(2, now),
    day4: !isUnlockTimeForDay(3, now),
    day5: !isUnlockTimeForDay(4, now),
    week: !weeklyUnlockTime(now),
  }

  return { coins: 0, badges: 0, streakDays: 0, onStreak: false, daily, weekly, _locks: locks }
}

export function weekNumber(d: Date) {
  const { start } = getWeekBoundsIST(d)
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const diff = (start.getTime() - yearStart.getTime()) / (1000*60*60*24)
  return Math.floor(diff / 7) + 1
}
