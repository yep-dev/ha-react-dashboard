import styled from '@emotion/styled'
import { CurrentProject, CurrentProjectTimer, DmnPicker } from '@mobile'
import { MobileColumn } from 'mobile/MobileColumn.tsx'

const Column = styled(MobileColumn)`
  min-height: 514px;
  width: 100%;
`

export const Column3 = () => {
  return (
    <Column column align="flex-start">
      <CurrentProject />
      <CurrentProjectTimer />
      <DmnPicker />
    </Column>
  )
}
