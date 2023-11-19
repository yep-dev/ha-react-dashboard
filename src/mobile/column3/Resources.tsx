import { Card, Stack, Txt } from '@components'
import { colors } from '@constants.ts'
import { EntityName, HassEntityWithService, useEntity } from '@hakit/core'
import { useState } from 'react'
import { useDebounce } from 'react-use'

type Props = {
  name: string
  inverted?: boolean
}

const Resource = ({ name, inverted }: Props) => {
  const { state, service } = useEntity(
    ('input_select.resource_' + name) as EntityName,
  ) as unknown as HassEntityWithService<'input_select'>
  const [localState, setLocalState] = useState(state)

  useDebounce(
    () => {
      if (localState !== state) {
        service.selectOption({ option: localState })
      }
    },
    2000,
    [localState],
  )

  const handleClick = () => {
    let nextValue = (parseInt(localState) + 1).toString()
    if (nextValue === '0') nextValue = '3'
    if (nextValue === '4') nextValue = '1'
    setLocalState(nextValue)
  }
  return (
    <Card
      color={
        localState === '2'
          ? colors.yellow
          : localState === (inverted ? '3' : '1')
          ? colors.red
          : colors.green
      }
      size="lg"
      onClick={handleClick}
    >
      <Txt size="sm" style={{ width: '100%' }}>
        {name}
      </Txt>
    </Card>
  )
}

export const Resources = () => {
  return (
    <Stack radius>
      <Resource name="energy" />
      <Resource name="mental" />
      <Resource name="wandering" inverted />
      <Resource name="distraction" inverted />
      <Resource name="flow" />
    </Stack>
  )
}
