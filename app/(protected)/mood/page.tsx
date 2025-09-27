'use client'
import Guard from '@/components/guard'
import QuestionScreen from '@/components/question-screen'
import { useRouter } from 'next/navigation'
import { useCheckinStore } from '@/stores/checkin'

const options = [
  { label: 'Happy', value: 'Happy', icon: '😊' },
  { label: 'Calm', value: 'Calm', icon: '😌' },
  { label: 'Neutral', value: 'Neutral', icon: '😐' },
  { label: 'Stressed', value: 'Stressed', icon: '😣' },
  { label: 'Sad', value: 'Sad', icon: '😔' },
]

export default function Page() {
  const router = useRouter()
  const save = useCheckinStore(s => s.saveCheckin)
  return (
    <Guard>
      <div className="flex flex-1 items-center justify-center py-10">
        <QuestionScreen title="How are you feeling today?" options={options} onSelect={(v) => { save({ mood: v }); router.push('/motivation') }} />
      </div>
    </Guard>
  )
}
