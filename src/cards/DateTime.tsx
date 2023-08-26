import { useEntity } from '@hakit/core'
import { Card, Txt } from '@components'
import { format, parseISO } from 'date-fns'

export const DateTime = () => {
  const time = useEntity('sensor.time')
  const date = useEntity('sensor.date')
  const dateString = format(parseISO(date.state), 'd MMM')

  return (
    <Card align="space-around">
      <Txt size="lg">{dateString}</Txt>
      <Txt weight="bold" size="lg">
        {time.state}
      </Txt>
    </Card>
  )
}
