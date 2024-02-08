import { Card, Stack, Txt } from '@components'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const DateTime = () => {
  const browserDateTime = new Date()

  // todo: upgrade to date-fns 3.0 once -tz supports it and cleanup ignores
  const timeZoneLosAngeles = 'America/Los_Angeles'
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const zonedDateLosAngeles = utcToZonedTime(browserDateTime, timeZoneLosAngeles)
  const timeStringLosAngeles = format(zonedDateLosAngeles, 'hh:mm a', {
    // @ts-expect-error
    timeZone: timeZoneLosAngeles,
  })

  const timeZoneEastern = 'America/New_York'
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const zonedDateEastern = utcToZonedTime(browserDateTime, timeZoneEastern)
  // @ts-expect-error
  const timeStringEastern = format(zonedDateEastern, 'hh:mm a', { timeZone: timeZoneEastern })

  return (
    <Card align="space-around">
      <Stack>
        <Txt size="xl">{format(browserDateTime, 'E d MMM')}</Txt>
      </Stack>
      <Stack alignItems="center">
        <Txt weight="bold" size="xl" style={{ marginRight: 16 }}>
          {format(browserDateTime, 'HH:mm')}
        </Txt>
        <Stack column gap={0}>
          <Txt size="sm"> {timeStringEastern}</Txt>
          <Txt size="sm"> {timeStringLosAngeles}</Txt>
        </Stack>
      </Stack>
    </Card>
  )
}
