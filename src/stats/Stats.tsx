import { Stack } from '@components'
import { useDay } from '@hooks'
import {
  AlignedStats,
  ProjectTimeline,
  SlotAlignedTimeline,
  SlotsTimeline,
  TimeScaleComponent,
} from '@stats'
import { parseTime } from '@utils'
import { addDays, differenceInMinutes, isAfter } from 'date-fns'

export type SensorData = {
  last_changed: string
  state: string
}

export const Stats = () => {
  const { isDay } = useDay()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call

  const times1 = {
    startTime: '09:00',
    endTime: '20:30',
  }
  const times2 = {
    startTime: '23:00',
    endTime: '06:00',
  }

  const times = isDay ? times1 : times2

  const start = parseTime(times.startTime)
  let end = parseTime(times.endTime)
  if (isAfter(start, end)) {
    end = addDays(end, 1)
  }
  const props = { ...times, duration: differenceInMinutes(end, start) }

  return (
    // setup for 1920x550 px (200% scaling of 4k slim display)
    <Stack
      column
      style={{
        width: 1920,
        height: 549,
        borderBottom: '1px solid white inset',
      }}
      stretch={false}
    >
      <Stack column>
        <TimeScaleComponent {...props} />
        <ProjectTimeline {...props} />
        <SlotsTimeline {...props} />
        <SlotAlignedTimeline {...props} />
      </Stack>

      <Stack align="start" style={{ marginTop: 12, flex: 1 }}>
        <AlignedStats />
      </Stack>
    </Stack>
  )
}
