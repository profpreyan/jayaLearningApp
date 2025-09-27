import { format } from 'date-fns'

export function nowIST(): Date {
  // Use Asia/Kolkata without external tz libs
  const fmt = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const parts = Object.fromEntries(fmt.formatToParts(new Date()).map(p => [p.type, p.value])) as any
  const iso = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`
  return new Date(iso)
}

export function greetForIST(d: Date) {
  const h = d.getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function formatISO(d: Date) { return format(d, 'yyyy-MM-dd') }

export function getWeekBoundsIST(d: Date) {
  // Monday start, Sunday end
  const day = d.getDay() // 0 Sun .. 6 Sat
  const diffToMon = (day + 6) % 7
  const start = new Date(d); start.setDate(d.getDate() - diffToMon)
  const end = new Date(start); end.setDate(start.getDate() + 6)
  return { start, end }
}

export function isUnlockTimeForDay(indexFromMon: number, now = nowIST()) {
  // indexFromMon: 0=Mon .. 4=Fri
  const { start } = getWeekBoundsIST(now)
  const target = new Date(start)
  target.setDate(start.getDate() + indexFromMon)
  target.setHours(5,0,0,0) // 05:00 IST
  return now >= target
}

export function weeklyUnlockTime(now = nowIST()) {
  const { start } = getWeekBoundsIST(now)
  const sat = new Date(start); sat.setDate(start.getDate() + 5); sat.setHours(5,0,0,0)
  return now >= sat
}
