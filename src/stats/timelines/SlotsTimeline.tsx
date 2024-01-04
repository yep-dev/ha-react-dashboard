import { categoryColors } from '@constants.ts'
import { useHistoryStats } from '@hooks'
import { GanttChart } from '@stats'
import { addWeeks } from 'date-fns'

type Props = {
  startTime: string
  endTime: string
  duration: number
}

export const SlotsTimeline = ({ startTime, endTime, duration }: Props) => {
  const data = useHistoryStats(
    'sensor.slot',
    startTime,
    endTime,
    addWeeks(new Date(), -1),
    addWeeks(new Date(), -1),
  )
  const getColor = (slot: string): string | string[] => {
    slot = slot.toLowerCase()
    const slot2 =
      {
        break: 'food',
        eating: 'food',
        'body & mind': [categoryColors.body, categoryColors.mind],
        'sleep 1': 'sleep',
        'sleep 2': 'sleep',
      }[slot] ?? slot

    return categoryColors[slot2 as keyof typeof categoryColors] || slot2
  }

  return data.length ? <GanttChart data={data} getColor={getColor} duration={duration} /> : null
}
