import { Card, Stack } from '@components'
import { DefaultServices, useEntity } from '@hakit/core'
import styled from '@emotion/styled'

const Title = styled.div`
  direction: ltr;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  text-align: center;
`

export const Player = () => {
  const player = useEntity('media_player.desk_3')
  // hakit – fix type assigned
  const api = player.api as DefaultServices<'no-target'>['mediaPlayer']

  const playRadio = () => {
    api.playMedia({
      media_content_id: 'radioparadise://4.flac',
      media_content_type: 'music',
    })
  }

  return (
    <Stack column radius>
      <Card style={{ direction: 'rtl' }}>
        {player.attributes.media_title && (
          <Title>
            {player.attributes.media_artist} – {/*hakit – type attributes as string by default*/}
            {(player.attributes.media_title as string).replace('.flac', '')}{' '}
          </Title>
        )}
      </Card>
      <Stack>
        <Card.Icon
          icon={player.state === 'playing' ? 'controls-pause' : 'controls-play'}
          onClick={() => {
            if (player.state === 'idle') {
              playRadio()
            } else api.mediaPlayPause()
          }}
        />
        <Card.Icon
          icon="controls-previous"
          onClick={() => {
            api.mediaSeek({ seek_position: 0.0001 })
          }}
        />
        <Card.Icon
          icon="controls-next"
          onClick={() => {
            if (player.attributes.repeat === 'one') api.repeatSet({ repeat: 'off' })
            api.mediaNextTrack()
          }}
        />
        <Card.Icon
          icon="volume-control-low"
          active={player.attributes.volume_level === 0.25}
          onClick={() => {
            api.volumeSet({ volume_level: 0.25 })
          }}
        />
        <Card.Icon
          icon="volume-control-medium"
          active={player.attributes.volume_level === 0.55}
          onClick={() => {
            api.volumeSet({ volume_level: 0.55 })
          }}
        />
        <Card.Icon
          icon="volume-control-full"
          active={player.attributes.volume_level === 0.67}
          onClick={() => {
            api.volumeSet({ volume_level: 0.75 })
          }}
        />
      </Stack>
      <Stack>
        <Card.Icon
          icon="radio-antenna-1"
          active={player.attributes.media_content_id === 'radioparadise://4.flac'}
          onClick={playRadio}
        />
        <Card.Icon
          icon="synchronize-arrow-1"
          active={player.attributes.repeat === 'one'}
          onClick={() => {
            api.repeatSet({ repeat: 'one' })
          }}
          secondClick={() => {
            api.repeatSet({ repeat: 'off' })
          }}
        />
        <Card.Icon icon="audio-file-search" beta />
        <Card.Icon icon="playlist-repeat" beta />
        <Card.Icon icon="audio-book-volume-high" beta />
      </Stack>
    </Stack>
  )
}
