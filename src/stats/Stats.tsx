import { Stack } from '@components'
import { ProjectTimeline, SlotsTimeline, TimeScaleComponent } from '@stats'
import { parseTime } from '@utils'
import { addDays, differenceInMinutes, isAfter } from 'date-fns'

export type SensorData = {
  last_changed: string
  state: string
}

export const Stats = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call

  const times1 = {
    startTime: '09:00',
    endTime: '20:30',
  }
  const times2 = {
    startTime: '23:00',
    endTime: '06:00',
  }

  const isNight = (now = new Date()) => now.getHours() >= 22 || now.getHours() < 7
  const times = isNight() ? times2 : times1

  const start = parseTime(times.startTime)
  let end = parseTime(times.endTime)
  if (isAfter(start, end)) {
    end = addDays(end, 1)
  }
  const props = { ...times, duration: differenceInMinutes(end, start) }

  return (
    // setup for 1920x550 px (200% scaling of 4k slim display)
    <div style={{ width: 1920, height: 549, borderBottom: '1px solid white inset' }}>
      <Stack column>
        <TimeScaleComponent {...props} />
        <ProjectTimeline {...props} />
        <SlotsTimeline {...props} />
      </Stack>
    </div>
  )
}
