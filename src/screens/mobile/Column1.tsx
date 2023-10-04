import { AirConditioner, CurrentTask, DateTime, Sensors, TimeBlock } from '@screens'
import { MainColumn, Stack } from '@components'

export const Column1 = () => {
  return (
    <MainColumn>
      <DateTime />
      <TimeBlock />
      <CurrentTask />
      <AirConditioner />
      <Stack>
        <Sensors />
      </Stack>
    </MainColumn>
  )
}
