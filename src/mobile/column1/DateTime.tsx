import { Card, Stack, Txt } from '@components'
import { useEntity } from '@hakit/core'
import { format } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

export const DateTime = () => {
  const timeEntity = useEntity('sensor.time')
  const dateEntity = useEntity('sensor.date')

  const dateTimeString = `${dateEntity.state}T${timeEntity.state}:00`
  const timeZoneWarsaw = 'Europe/Warsaw'

  // todo: upgrade to date-fns 3.0 once -tz supports it and cleanup ignores
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const dateTimeInWarsaw = zonedTimeToUtc(dateTimeString, timeZoneWarsaw)
  // @ts-expect-error
  const dateStringWarsaw = format(dateTimeInWarsaw, 'E d MMM', { timeZone: timeZoneWarsaw })

  const timeZoneLosAngeles = 'America/Los_Angeles'
  const timeZoneEastern = 'America/New_York'

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const zonedDateLosAngeles = utcToZonedTime(dateTimeInWarsaw, timeZoneLosAngeles)
  const timeStringLosAngeles = format(zonedDateLosAngeles, 'hh:mm a', {
    // @ts-expect-error
    timeZone: timeZoneLosAngeles,
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const zonedDateEastern = utcToZonedTime(dateTimeInWarsaw, timeZoneEastern)
  // @ts-expect-error
  const timeStringEastern = format(zonedDateEastern, 'hh:mm a', { timeZone: timeZoneEastern })

  return (
    <Card align="space-around">
      <Stack>
        <Txt size="xl">{dateStringWarsaw}</Txt>
      </Stack>
      <Stack alignItems="center">
        <Txt weight="bold" size="xl" style={{ marginRight: 16 }}>
          {timeEntity.state}
        </Txt>
        <Stack column gap={0}>
          <Txt size="sm"> {timeStringEastern}</Txt>
          <Txt size="sm"> {timeStringLosAngeles}</Txt>
        </Stack>
      </Stack>
    </Card>
  )
}
