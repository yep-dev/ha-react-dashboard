import { categoryColors } from '@constants.ts'
import { GanttChart } from '@stats'
import useHistoryStats from '@stats/hooks.ts'

export const SlotsTimeline = () => {
  const data = useHistoryStats('sensor.slot')

  const getColor = (slot: string) => {
    return categoryColors[slot.toLowerCase() as keyof typeof categoryColors]
  }

  return data.length ? <GanttChart data={data} getColor={getColor} /> : null
}
