import { Stack } from '@components'
import { AirConditioner, Boiler, DateTime, Light, Sensors, TimeBlock } from '@mobile'

export const Column1 = () => {
  return (
    <Stack.MobileColumn>
      <DateTime />
      <TimeBlock />
      <AirConditioner />
      <Boiler />
      <Light />
      <Stack>
        <Sensors />
      </Stack>
    </Stack.MobileColumn>
  )
}
