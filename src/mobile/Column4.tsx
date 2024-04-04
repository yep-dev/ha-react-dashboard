import { CardSwitch, Icon, MobileColumn } from '@components'
import styled from '@emotion/styled'
import { useEntity } from '@hooks'
import { RekuDetails } from '@mobile/tab/RekuDetails.tsx'

const Column = styled(MobileColumn)`
  min-height: 514px;
`

export const Column4 = () => {
  const printer = useEntity('switch.printer_power')

  return (
    <Column>
      <CardSwitch entity={printer}>
        <Icon name="printer" />
      </CardSwitch>
      <RekuDetails />
    </Column>
  )
}
