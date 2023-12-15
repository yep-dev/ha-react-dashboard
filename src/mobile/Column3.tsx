import { Stack } from '@components'
import styled from '@emotion/styled'
import { useEntity } from '@hakit/core'
import { CurrentProject, CurrentProjectTimer, DmnPicker, SleepTimer } from '@mobile'

const Column = styled(Stack.MobileColumn)`
  min-height: 514px;
  width: 100%;
`

export const Column3 = () => {
  const sleep = useEntity('calendar.sleep').state

  return (
    <Column column align="flex-start">
      <CurrentProject />
      {sleep === 'on' ? <SleepTimer /> : <CurrentProjectTimer />}
      <DmnPicker />
    </Column>
  )
}
