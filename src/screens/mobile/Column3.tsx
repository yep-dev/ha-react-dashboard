import { MainColumn } from '@components'
import styled from '@emotion/styled'
import { CurrentProject } from '@screens'

const Column = styled(MainColumn)`
  min-height: 514px;
  width: 100%;
`

export const Column3 = () => {
  return (
    <Column>
      <CurrentProject />
    </Column>
  )
}
