import { MainColumn } from '@components'
import styled from '@emotion/styled'
import { CurrentProject, CurrentProjectTimer, DmnModal } from '@screens'
import { Resources } from '@screens/column3/Resources.tsx'

const Column = styled(MainColumn)`
  min-height: 514px;
  width: 100%;
`

export const Column3 = () => {
  return (
    <Column column align="flex-start">
      <CurrentProject />
      <CurrentProjectTimer />
      <DmnModal />
      <Resources />
    </Column>
  )
}
