import { Stack } from '@components'
import { AirConditioner, DateTime, Sensors, TimeBlock } from '@mobile'

export const Column1 = () => {
  return (
    <Stack.MobileColumn>
      <DateTime />
      <TimeBlock />
      <AirConditioner />
      <Stack>
        <Sensors />
      </Stack>
    </Stack.MobileColumn>
  )
}
