import { Card, InfoCard, Stack, Txt } from '@components'
import { useDay, useEntity } from '@hooks'

export const AlignedStats = () => {
  const { isDay, setIsDay } = useDay()

  const worktimePositive = useEntity('sensor.aligned_worktime_positive').number
  const worktimeNegative = useEntity('sensor.aligned_worktime_negative').number
  const dayPositive = useEntity('sensor.aligned_day_positive').number
  const dayNegative = useEntity('sensor.aligned_day_negative').number
  const nightPositive = useEntity('sensor.aligned_night_positive').number
  const nightNegative = useEntity('sensor.aligned_night_negative').number

  return (
    <Stack
      column
      style={{
        maxWidth: 200,
        justifyContent: 'space-between',
      }}
      stretch={false}
    >
      <Stack column>
        <Txt>Aligned</Txt>
        {isDay ? (
          <>
            <InfoCard value={worktimePositive - worktimeNegative} suffix="%">
              worktime
            </InfoCard>
            <InfoCard value={dayPositive - dayNegative} suffix="%">
              day
            </InfoCard>
          </>
        ) : (
          <InfoCard value={nightPositive - nightNegative} suffix="%">
            night
          </InfoCard>
        )}
      </Stack>
      <Stack column>
        <Card
          onClick={() => {
            setIsDay((isDay) => !isDay)
          }}
        />
      </Stack>
    </Stack>
  )
}
