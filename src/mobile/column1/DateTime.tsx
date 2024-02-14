import { useEffect, useState } from 'react'
import { Card, Stack, Txt } from '@components'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const DateTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
    return () => {
      clearInterval(timerId)
    }
  }, [])

  const getTimeString = (timeZone: string) => {
    const zonedDate = utcToZonedTime(currentDate, timeZone)
    return format(zonedDate, 'hh:mm a', {
      // @ts-expect-error
      timeZone,
    })
  }

  return (
    <Card align="space-around">
      <Stack>
        <Txt size="xl">{format(currentDate, 'E d MMM')}</Txt>
      </Stack>
      <Stack alignItems="center">
        <Txt weight="bold" size="xl" style={{ marginRight: 16 }}>
          {format(currentDate, 'HH:mm')}
        </Txt>
        <Stack column gap={0}>
          <Txt size="sm"> {getTimeString('America/New_York')}</Txt>
          <Txt size="sm"> {getTimeString('America/Los_Angeles')}</Txt>
        </Stack>
      </Stack>
    </Card>
  )
}
