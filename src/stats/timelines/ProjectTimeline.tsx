import { categoryColors } from '@constants.ts'
import { GlobalContext } from '@GlobalData.ts'
import { GanttChart } from '@stats'
import useHistoryStats from '@stats/hooks.ts'
import { useContext } from 'react'

export const ProjectTimeline = () => {
  const { projectCategory } = useContext(GlobalContext).categories

  const data = useHistoryStats('input_select.project')

  const getColor = (state: string) => {
    const category = projectCategory[state].toLowerCase() || 'default'
    return categoryColors[category as keyof typeof categoryColors]
  }

  return data.length ? <GanttChart data={data} getColor={getColor} /> : null
}
