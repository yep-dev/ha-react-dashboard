import { MainColumn, Stack } from '@components'
import { AirConditioner, DateTime, Sensors, TimeBlock } from '@screens'

export const Column1 = () => {
  return (
    <MainColumn>
      <DateTime />
      <TimeBlock />
      <AirConditioner />
      <Stack>
        <Sensors />
      </Stack>
    </MainColumn>
  )
}
