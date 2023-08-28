import { Stack } from '@components'
import styled from '@emotion/styled'
import { AirConditioner, DateTime, Sensors, TimeBlock } from '@cards'

const MainColumn = styled(Stack)`
  flex: 1;
  min-width: 406px;
`

interface Props {
  tablet?: boolean
}

export const Mobile = ({ tablet = false }: Props) => {
  return (
    <Stack gap={12} align="flex-start" style={{ flexWrap: tablet ? 'wrap' : 'inherit' }}>
      <MainColumn column>
        <DateTime />
        <TimeBlock />
        <AirConditioner />
        <Stack>
          <Sensors />
        </Stack>
      </MainColumn>
      <MainColumn>asd</MainColumn>
      <MainColumn>asd</MainColumn>
    </Stack>
  )
}
