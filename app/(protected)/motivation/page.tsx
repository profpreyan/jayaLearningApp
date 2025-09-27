'use client'
import Guard from '@/components/guard'
import QuestionScreen from '@/components/question-screen'
import { useRouter } from 'next/navigation'
import { useCheckinStore } from '@/stores/checkin'

const options = [
  { label: 'Very low', value: 'Very low', icon: '😴' },
  { label: 'Low', value: 'Low', icon: '🥱' },
  { label: 'Medium', value: 'Medium', icon: '🙂' },
  { label: 'High', value: 'High', icon: '😄' },
  { label: 'Very high', value: 'Very high', icon: '🤩' },
]

export default function Page() {
  const router = useRouter()
  const save = useCheckinStore(s => s.saveCheckin)
  return (
    <Guard>
      <QuestionScreen title="How motivated do you feel today to learn?" options={options} onSelect={(v) => { save({ motivation: v }); router.push('/energy') }} />
    </Guard>
  )
}
