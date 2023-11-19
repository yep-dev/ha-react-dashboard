import { Stack } from '@components'
import { TimeScaleComponent } from '@screens/stats/components/TimeScale.tsx'
import { ProjectTimeline } from '@screens/stats/timelines/ProjectTimeline.tsx'
import { SlotsTimeline } from '@screens/stats/timelines/SlotsTimeline.tsx'

export type SensorData = {
  last_changed: string
  state: string
}

export const Stats = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return (
    // setup for 1920x550 px (200% scaling of 4k slim display)
    <div style={{ width: 1920, height: 549, borderBottom: '1px solid white inset' }}>
      <Stack column>
        <TimeScaleComponent startTime="09:00" endTime="20:30" />
        <ProjectTimeline />
        <SlotsTimeline />
      </Stack>
    </div>
  )
}
