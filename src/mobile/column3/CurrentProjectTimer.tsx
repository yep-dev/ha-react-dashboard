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
          project.service.selectOption({ option: 'Idling' })
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
  const afterExpiration = Math.max(timePassedSeconds - durationSeconds, 0)

  const progressValue =
    afterExpiration && afterExpiration <= 60 && project.state !== 'Idling'
      ? afterExpiration / 60
      : timePassedSeconds / durationSeconds

  return (
    <Stack radius>
      <Card
        size="xl"
        align="space-around"
        onClick={() => {
          if (project.state !== 'Idling') {
            project.service.selectOption({ option: 'Idling' })
          }
        }}
        progress={progressValue}
        color={afterExpiration ? (afterExpiration <= 60 ? colors.orange : colors.red) : undefined}
      >
        {`${timePassed}`} {duration > 0 && `/ ${duration}`} minutes{' '}
        {process.env.NODE_ENV === 'development' && `(${timePassedSeconds}/${durationSeconds})`}
      </Card>
      <Card.Icon
        icon="time-stopwatch"
        size="xl"
        style={{ maxWidth: 100 }}
        onClick={open}
        beta={project.state === 'Idling'}
      />
    </Stack>
  )
}
