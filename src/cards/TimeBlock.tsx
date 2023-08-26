import { useEntity } from '@hakit/core'
import { Card, Txt } from '@components'
import { differenceInMinutes, format, parse } from 'date-fns'
import { categoryColors, ICategory } from '@constants'
import { textToCamel } from '@utils'

export const TimeBlock = () => {
  const marvin = useEntity('calendar.marvin')
  const time = useEntity('sensor.time')
  const startTime = format(new Date(marvin.attributes.start_time), 'HH:mm')
  const endTime = format(new Date(marvin.attributes.end_time), 'HH:mm')

  const now = parse(time.state, 'HH:mm', new Date())
  const endDateTime = new Date(marvin.attributes.end_time)
  const diff = differenceInMinutes(endDateTime, now)

  const hoursLeft = Math.floor(diff / 60)
  const minutesLeft = diff % 60
  const slot = marvin.attributes.message
  const category = textToCamel(slot) as ICategory

  return (
    <Card
      alignItems="baseline"
      align="space-around"
      style={{ backgroundColor: categoryColors[category] }}
    >
      <Txt weight="bold">{slot}</Txt>
      <Txt>
        {startTime} - {endTime}
      </Txt>
      <Txt>
        {!!hoursLeft && hoursLeft + 'h'} {minutesLeft}m
      </Txt>
    </Card>
  )
}
