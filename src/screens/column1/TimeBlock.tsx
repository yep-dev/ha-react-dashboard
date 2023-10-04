import { useEntity } from '@hakit/core'
import { Card, Txt } from '@components'
import { differenceInMinutes, format, parse } from 'date-fns'
import { categoryColors, ICategory } from '@constants.ts'
import { textToCamel } from '@utils.ts'

export const TimeBlock = () => {
  const marvin = useEntity('calendar.slots')
  const time = useEntity('sensor.time')

  const cardProps = {
    alignItems: 'center',
    align: 'space-around',
    size: 'sm',
  } as const
  if (marvin.state === 'off') return <Card {...cardProps}>no event</Card>

  const startTime = format(new Date(marvin.attributes.start_time as string), 'HH:mm')
  const endTime = format(new Date(marvin.attributes.end_time as string), 'HH:mm')

  const now = parse(time.state, 'HH:mm', new Date())
  const endDateTime = new Date(marvin.attributes.end_time as string)
  const diff = differenceInMinutes(endDateTime, now)

  const hoursLeft = Math.floor(diff / 60)
  const minutesLeft = diff % 60
  const slot = marvin.attributes.message as string
  const category = textToCamel(slot) as ICategory

  return (
    <Card style={{ backgroundColor: categoryColors[category] }} {...cardProps}>
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
