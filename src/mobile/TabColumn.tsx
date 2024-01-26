import { Card, Icon, Stack } from '@components'
import styled from '@emotion/styled'
import { useEntity } from '@hooks'

const Column = styled(Stack.MobileColumn)`
  min-height: 514px;
`

export const TabColumn = () => {
  const printer = useEntity('switch.printer_power')

  return (
    <Column>
      <Stack>
        <Card.Switch entity={printer}>
          <Icon name="printer" />
        </Card.Switch>
      </Stack>
    </Column>
  )
}
