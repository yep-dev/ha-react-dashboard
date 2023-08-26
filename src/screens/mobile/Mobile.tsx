import { Stack } from '@components'
import styled from '@emotion/styled'
import { AirConditioner, DateTime, TimeBlock } from '@cards'

const MainColumn = styled(Stack)`
  flex: 1;
  min-width: 180px;
`

interface Props {
  tablet?: boolean
}

export const Mobile = ({ tablet = false }: Props) => {
  return (
    <Stack
      gap={16}
      align="flex-start"
      style={{ flexWrap: tablet ? 'wrap' : 'inherit' }} // Enable wrapping
    >
      <MainColumn column>
        <DateTime />
        <TimeBlock />
        <AirConditioner />
      </MainColumn>
      <MainColumn>asd</MainColumn>
      <MainColumn>asd</MainColumn>
    </Stack>
  )
}
