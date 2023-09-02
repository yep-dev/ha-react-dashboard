import { Stack } from '@components'
import styled from '@emotion/styled'
import { AirConditioner, DateTime, Sensors, TimeBlock } from '@cards'

const MainColumn = styled(Stack)`
  min-width: 417px;
  max-width: 417px;
  min-height: 540px;
  border-bottom: 1px solid white;

  & > div {
    flex: none;
  }
`

export const Mobile = () => {
  return (
    // setup for 1260x540 px (200% scaling of super light – to attach to the arm – xperia 10 V phone)
    <Stack
      gap={'0 10px'}
      align="space-around"
      alignItems="flex-start"
      wrap="wrap"
      style={{ height: 540 }}
      stretch={false}
    >
      <MainColumn column align="flex-start">
        <DateTime />
        <TimeBlock />
        <AirConditioner />
        <Stack>
          <Sensors />
        </Stack>
      </MainColumn>
      <MainColumn>qwe</MainColumn>
      <MainColumn style={{ minHeight: 500 }}>asd</MainColumn>
      <MainColumn style={{ minHeight: 520 }}>asd</MainColumn>
    </Stack>
  )
}
