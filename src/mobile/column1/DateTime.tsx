import { Card, Stack, Txt } from '@components'
import { useEntity } from '@hakit/core'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const DateTime = () => {
  const timeEntity = useEntity('sensor.time')
  const dateEntity = useEntity('sensor.date')

  const dateTimeString = `${dateEntity.state}T${timeEntity.state}:00Z`

  const timeZoneWarsaw = 'Europe/Warsaw'
  const timeZoneLosAngeles = 'America/Los_Angeles'
  const timeZoneEastern = 'America/New_York' // Eastern Time Zone

  // todo: upgrade to date-fns 3.0 once -tz supports it and cleanup ignores

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const zonedDateWarsaw = utcToZonedTime(dateTimeString, timeZoneWarsaw)
  // @ts-expect-error
  const timeStringWarsaw = format(zonedDateWarsaw, 'HH:mm', { timeZone: timeZoneWarsaw })
  // @ts-expect-error
  const dateStringWarsaw = format(zonedDateWarsaw, 'E d MMM', { timeZone: timeZoneWarsaw })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const zonedDateLosAngeles = utcToZonedTime(dateTimeString, timeZoneLosAngeles)
  const timeStringLosAngeles = format(zonedDateLosAngeles, 'hh:mm a', {
    // @ts-expect-error
    timeZone: timeZoneLosAngeles,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const zonedDateEastern = utcToZonedTime(new Date(dateTimeString), timeZoneEastern)
  // @ts-expect-error
  const timeStringEastern = format(zonedDateEastern, 'hh:mm a', { timeZone: timeZoneEastern })

  return (
    <Card align="space-around">
      <Stack>
        <Txt size="xl">{dateStringWarsaw}</Txt>
      </Stack>
      <Stack alignItems="center">
        <Txt weight="bold" size="xl" style={{ marginRight: 16 }}>
          {timeStringWarsaw}
        </Txt>
        <Stack column gap={0}>
          <Txt size="sm"> {timeStringEastern}</Txt>
          <Txt size="sm"> {timeStringLosAngeles}</Txt>
        </Stack>
      </Stack>
    </Card>
  )
}
