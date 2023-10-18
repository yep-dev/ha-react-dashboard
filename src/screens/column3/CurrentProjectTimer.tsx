import { Card } from '@components'
import { colors } from '@constants.ts'
import { useEntity } from '@hakit/core'
import { dateTime } from '@utils.ts'
import { differenceInSeconds, fromUnixTime } from 'date-fns'
import { useEffect, useState } from 'react'

export const CurrentProjectTimer = () => {
  const taskStart = useEntity('input_datetime.task_start').state
  const project = useEntity('input_select.project').api
  const estimateEnd = useEntity('input_datetime.task_estimate_end')
  const [timePassedSeconds, setTimePassedSeconds] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const startTime = new Date(taskStart)
      const diff = differenceInSeconds(now, startTime) - 60 * 60
      setTimePassedSeconds(diff)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [taskStart])

  const durationSeconds =
    differenceInSeconds(new Date(estimateEnd.state), new Date(taskStart)) - 60 * 60
  const duration = Math.floor(durationSeconds / 60)
  const timePassed = Math.floor(timePassedSeconds / 60)

  return (
    <Card
      size="lg"
      align="space-around"
      onClick={() => {
        project.selectOption({ option: 'Idling' })
        estimateEnd.api.setDatetime({ datetime: dateTime(fromUnixTime(0)) })
      }}
      progress={timePassedSeconds / durationSeconds}
      color={
        timePassedSeconds > durationSeconds && !estimateEnd.state.startsWith('1970')
          ? Math.abs(timePassed - duration) > 5
            ? colors.red
            : colors.orange
          : undefined
      }
    >
      {`${timePassed}`} {duration >= 0 && `/ ${duration}`} minutes
    </Card>
  )
}
