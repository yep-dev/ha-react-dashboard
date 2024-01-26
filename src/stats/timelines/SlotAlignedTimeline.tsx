import { categoryColors } from '@constants'
import { useHistoryStats } from '@hooks'
import { GanttChart } from '@stats'

type Props = {
  startTime: string
  endTime: string
  duration: number
}

export const SlotAlignedTimeline = ({ startTime, endTime, duration }: Props) => {
  const data = useHistoryStats('sensor.aligned', startTime, endTime)
  const getColor = (overlap: string): string => {
    if (overlap === '1') {
      return categoryColors.work
    } else if (overlap === '-1') {
      return categoryColors.sleep
    } else {
      return categoryColors.idling
    }
  }

  return data.length ? (
    <GanttChart data={data} getColor={getColor} duration={duration} size="sm" />
  ) : null
}
