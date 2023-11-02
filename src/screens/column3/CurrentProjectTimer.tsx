import { Card, Stack } from '@components'
import { colors } from '@constants.ts'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals'
import { differenceInSeconds, isAfter } from 'date-fns'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'

export const CurrentProjectTimer = () => {
  const { open, close, isOpen } = useModal('estimate')
  const project = useEntity('input_select.project')
  const category = useEntity('input_select.category').state
  const taskStart = useEntity('input_datetime.task_start').state
  const estimateEnd = useEntity('input_datetime.task_estimate_end')
  const [timePassedSeconds, setTimePassedSeconds] = useState(0)
  const [estimateTimeout, setEstimateTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isOpen) {
      setEstimateTimeout(
        setTimeout(() => {
          project.api.selectOption({ option: 'Idling' })
        }, 30000),
      )
    } else {
      if (estimateTimeout) {
        clearTimeout(estimateTimeout)
      }
    }
  }, [isOpen])

  useEffect(() => {
    const ws = new WebSocket('wss://10.0.0.100:6400/ws/marvin')
    ws.onmessage = () => {
      open()
    }
    return () => {
      ws.close()
    }
  }, [])

  useEffect(() => {
    if (isAfter(new Date(estimateEnd.state), new Date())) {
      close()
    }
  }, [estimateEnd.state])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const startTime = new Date(taskStart)
      const diff = differenceInSeconds(now, startTime)
      setTimePassedSeconds(diff)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [taskStart])

  const durationSeconds = differenceInSeconds(new Date(estimateEnd.state), new Date(taskStart))
  const duration = Math.max(Math.floor(durationSeconds / 60), 0)
  const timePassed = Math.floor(timePassedSeconds / 60)

  useDebounce(
    () => {
      if (durationSeconds < 5 && category !== 'Idling' && !isOpen) {
        open()
      }
    },
    1000,
    [durationSeconds, category, isOpen],
  )

  useEffect(() => {
    if ('vibrate' in navigator && !['Sleep', 'Outside', 'Social'].includes(category)) {
      // if (timePassed == duration && category !== 'Idling') {
      //   navigator.vibrate([300, 150, 300])
      // }
      if (
        (timePassedSeconds - durationSeconds) % 120 === 0 &&
        timePassedSeconds >= durationSeconds
      ) {
        navigator.vibrate(400)
      }
    }
  }, [timePassedSeconds, durationSeconds])

  return (
    <Stack radius>
      <Card
        size="lg"
        align="space-around"
        onClick={() => {
          if (project.state !== 'Idling') {
            project.api.selectOption({ option: 'Idling' })
          }
        }}
        progress={timePassedSeconds / durationSeconds}
        color={
          timePassed >= duration
            ? Math.abs(timePassed - duration) > 2
              ? colors.red
              : colors.orange
            : undefined
        }
      >
        {`${timePassed}`} {duration > 0 && `/ ${duration}`} minutes{' '}
        {process.env.NODE_ENV === 'development' && `(${timePassedSeconds}/${durationSeconds})`}
      </Card>
      <Card.Icon
        icon="time-stopwatch"
        size="lg"
        style={{ maxWidth: 80 }}
        onClick={open}
        beta={project.state === 'Idling'}
      />
    </Stack>
  )
}
