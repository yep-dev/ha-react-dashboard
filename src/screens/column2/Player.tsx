import { Card, Stack } from '@components'
import { useEntity } from '@hakit/core'
import styled from '@emotion/styled'

const Title = styled.div`
  direction: ltr;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  text-align: center;
`

export const Player = () => {
  const player = useEntity('media_player.desk')
  // hakit – fix type assigned

  const playRadio = () => {
    player.api.playMedia({
      media_content_id: 'radioparadise://4.flac',
      media_content_type: 'music',
    })
  }

  return (
    <Stack column radius>
      <Card style={{ direction: 'rtl', flex: 'inherit' }}>
        {player.attributes.media_title && (
          <Title>
            {player.attributes.media_artist} – {player.attributes.media_title.replace('.flac', '')}{' '}
          </Title>
        )}
      </Card>
      <Stack radius={0}>
        <Card.Icon
          icon={player.state === 'playing' ? 'controls-pause' : 'controls-play'}
          onClick={() => {
            if (player.state === 'idle') {
              playRadio()
            } else player.api.mediaPlayPause()
          }}
        />
        <Card.Icon
          icon="controls-previous"
          onClick={() => {
            player.api.mediaSeek({ seek_position: 0.0001 })
          }}
        />
        <Card.Icon
          icon="controls-next"
          onClick={() => {
            if (player.attributes.repeat === 'one') player.api.repeatSet({ repeat: 'off' })
            player.api.mediaNextTrack()
          }}
        />
        <Card.Icon
          icon="volume-control-low"
          active={player.attributes.volume_level === 0.25}
          onClick={() => {
            player.api.volumeSet({ volume_level: 0.25 })
          }}
        />
        <Card.Icon
          icon="volume-control-medium"
          active={player.attributes.volume_level === 0.55}
          onClick={() => {
            player.api.volumeSet({ volume_level: 0.55 })
          }}
        />
        <Card.Icon
          icon="volume-control-full"
          active={player.attributes.volume_level === 0.67}
          onClick={() => {
            player.api.volumeSet({ volume_level: 0.75 })
          }}
        />
      </Stack>
      <Stack radius={0}>
        <Card.Icon
          icon="radio-antenna-1"
          active={player.attributes.media_content_id === 'radioparadise://4.flac'}
          onClick={playRadio}
        />
        <Card.Icon
          icon="synchronize-arrow-1"
          active={player.attributes.repeat === 'one'}
          onClick={() => {
            player.api.repeatSet({ repeat: 'one' })
          }}
          secondClick={() => {
            player.api.repeatSet({ repeat: 'off' })
          }}
        />
        <Card.Icon icon="audio-file-search" beta />
        <Card.Icon icon="playlist-repeat" beta />
        <Card.Icon icon="audio-book-volume-high" beta />
      </Stack>
    </Stack>
  )
}
