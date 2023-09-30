import { Card, MainColumn, Stack } from '@components'
import { HassEntityWithApi, useEntity } from '@hakit/core'

export const TabColumn = () => {
  const printer = useEntity('switch.printer_power') as HassEntityWithApi<'switch'>

  return (
    <MainColumn style={{ minHeight: 514 }}>
      <Stack>
        <Card.Icon
          icon="printer"
          onClick={() => {
            printer.api.turnOn()
          }}
        />
      </Stack>
    </MainColumn>
  )
}
