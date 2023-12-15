import { Card, Stack } from '@components'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals'
import { formatMinutes } from '@utils'
import { differenceInMinutes } from 'date-fns'
import { useEffect } from 'react'

export const SleepTimer = () => {
  const { open, selected } = useModal('sleep')
  const project = useEntity('input_select.project')
  const sleep = useEntity('calendar.sleep').attributes

  const duration = differenceInMinutes(new Date(sleep.end_time), new Date(sleep.start_time))
  const timePassed = differenceInMinutes(new Date(), new Date(sleep.start_time))

  useEffect(() => {
    console.log(selected)
  }, [selected])

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
        progress={timePassed / duration}
      >
        {formatMinutes(timePassed)} / {formatMinutes(duration)}
      </Card>
      <Card.Icon icon="time-stopwatch" size="xl" style={{ maxWidth: 100 }} onClick={open} />
    </Stack>
  )
}
