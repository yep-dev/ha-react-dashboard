import { Card, Stack } from '@components'
import { DefaultServices, useEntity } from '@hakit/core'

export const Player = () => {
  const player = useEntity('media_player.desk_3')
  const api = player.api as DefaultServices<'no-target'>['mediaPlayer']

  return (
    <Stack column radius>
      <Card>Title</Card>
      <Stack>
        <Card.Icon
          icon="controls-play"
          onClick={() => {
            api.mediaPlayPause()
          }}
        />
        <Card.Icon icon="controls-previous">asd</Card.Icon>
        <Card>asd</Card>
        <Card>asd</Card>
      </Stack>
    </Stack>
  )
}
