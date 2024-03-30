import { Stack } from '@components'
import { AirConditioner, Battery, Boiler, DateTime, Energy, Sensors, TimeBlock } from '@mobile'

export const Column1 = () => {
  return (
    <Stack.MobileColumn>
      <DateTime />
      <TimeBlock />
      <AirConditioner />
      <Boiler />
      <Battery />
      <Sensors />
      <Energy />
    </Stack.MobileColumn>
  )
}
