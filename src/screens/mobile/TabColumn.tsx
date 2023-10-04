import { Card, MainColumn, Stack } from '@components'
import styled from '@emotion/styled'
import { useEntity } from '@hakit/core'

const Column = styled(MainColumn)`
  min-height: 514px;
`

export const TabColumn = () => {
  const printer = useEntity('switch.printer_power')

  return (
    <Column>
      <Stack>
        <Card.Icon
          icon="controls-next"
          onClick={() => {
            printer.api.turnOn()
          }}
        />
      </Stack>
    </Column>
  )
}
