import { categoryColors } from '@constants.ts'
import { GlobalContext } from '@GlobalData.ts'
import { useHistoryStats } from '@hooks'
import { GanttChart } from '@stats'
import { useContext } from 'react'

type Props = { startTime: string; endTime: string; duration: number }

export const ProjectTimeline = ({ startTime, endTime, duration }: Props) => {
  const { projectCategory } = useContext(GlobalContext).categories

  const data = useHistoryStats('input_select.project', startTime, endTime)

  const getColor = (state: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const category = (projectCategory[state] || 'default').toLowerCase()
    return categoryColors[category as keyof typeof categoryColors]
  }

  return data.length ? <GanttChart data={data} duration={duration} getColor={getColor} /> : null
}
