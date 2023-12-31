import { Card, Stack } from '@components'
import styled from '@emotion/styled'
import { useEntity } from '@hakit/core'

const Column = styled(Stack.MobileColumn)`
  min-height: 514px;
`

export const TabColumn = () => {
  const printer = useEntity('switch.printer_power')

  return (
    <Column>
      <Stack>
        <Card.Icon
          icon="printer"
          onClick={() => {
            printer.service.turnOn()
          }}
        />
      </Stack>
    </Column>
  )
}
