import { MainColumn } from '@components'
import styled from '@emotion/styled'

const Column = styled(MainColumn)`
  min-height: 514px;
  @media (min-width: 1261px) {
    display: none;
  }
`

export const Column3 = () => {
  return <Column>asd</Column>
}
