import { Stack } from '@components'
import { AirConditioner, DateTime, MobileColumn, Sensors, TimeBlock } from '@mobile'

export const Column1 = () => {
  return (
    <MobileColumn>
      <DateTime />
      <TimeBlock />
      <AirConditioner />
      <Stack>
        <Sensors />
      </Stack>
    </MobileColumn>
  )
}
