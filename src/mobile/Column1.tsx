import { Stack } from '@components'
import { AirConditioner, Boiler, DateTime, Sensors, TimeBlock } from '@mobile'

export const Column1 = () => {
  return (
    <Stack.MobileColumn>
      <DateTime />
      <TimeBlock />
      <AirConditioner />
      <Boiler />
      <Stack>
        <Sensors />
      </Stack>
    </Stack.MobileColumn>
  )
}
