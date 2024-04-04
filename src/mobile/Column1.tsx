import { MobileColumn } from '@components'
import { AirConditioner, Battery, Boiler, DateTime, Energy, Sensors, TimeBlock } from '@mobile'

export const Column1 = () => {
  return (
    <MobileColumn>
      <DateTime />
      <TimeBlock />
      <AirConditioner />
      <Boiler />
      <Battery />
      <Sensors />
      <Energy />
    </MobileColumn>
  )
}
