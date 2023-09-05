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
          icon="ic:baseline-play-arrow"
          onClick={() => {
            api.mediaPlayPause()
          }}
        />
        <Card>asd</Card>
        <Card>asd</Card>
        <Card>asd</Card>
      </Stack>
    </Stack>
  )
}
