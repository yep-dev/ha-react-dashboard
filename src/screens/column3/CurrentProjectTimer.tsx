import { useEffect, useState } from 'react'
import { differenceInMinutes } from 'date-fns'
import { Card } from '@components'
import { useEntity } from '@hakit/core'

export const CurrentProjectTimer = () => {
  const taskStart = useEntity('input_datetime.task_start').state
  const project = useEntity('input_select.project').api
  const [timePassed, setTimePassed] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const startTime = new Date(taskStart)
      const diff = differenceInMinutes(now, startTime) - 60
      setTimePassed(diff)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [taskStart])

  return (
    <Card
      size="lg"
      align="space-around"
      onClick={() => {
        project.selectOption({ option: 'Idling' })
      }}
    >{`${timePassed} minutes`}</Card>
  )
}
