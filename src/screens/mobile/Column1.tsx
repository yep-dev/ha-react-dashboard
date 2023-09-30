import { AirConditioner, DateTime, Sensors, TimeBlock } from '@cards'
import { MainColumn, Stack } from '@components'

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
