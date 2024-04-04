import { Card, CardIcon, Stack } from '@components'
import styled from '@emotion/styled'
import { useEntity } from '@hakit/core'

const Title = styled.div`
  direction: ltr;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  text-align: center;
`

export const Player = () => {
  const player = useEntity('media_player.desk')

  const playRadio = () => {
    player.service.playMedia({
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
        <CardIcon
          icon={player.state === 'playing' ? 'controls-pause' : 'controls-play'}
          onClick={() => {
            if (player.state === 'idle') {
              playRadio()
            } else player.service.mediaPlayPause()
          }}
        />
        <CardIcon
          icon="controls-previous"
          onClick={() => {
            player.service.mediaSeek({ seek_position: 0.0001 })
          }}
        />
        <CardIcon
          icon="controls-next"
          onClick={() => {
            if (player.attributes.repeat === 'one') player.service.repeatSet({ repeat: 'off' })
            player.service.mediaNextTrack()
          }}
        />
        <CardIcon
          icon="volume-control-low"
          active={player.attributes.volume_level === 0.25}
          onClick={() => {
            player.service.volumeSet({ volume_level: 0.25 })
          }}
        />
        <CardIcon
          icon="volume-control-medium"
          active={player.attributes.volume_level === 0.55}
          onClick={() => {
            player.service.volumeSet({ volume_level: 0.55 })
          }}
        />
        <CardIcon
          icon="volume-control-full"
          active={player.attributes.volume_level === 0.67}
          onClick={() => {
            player.service.volumeSet({ volume_level: 0.75 })
          }}
        />
      </Stack>
      <Stack radius={0}>
        <CardIcon
          icon="radio-antenna-1"
          active={player.attributes.media_content_id === 'radioparadise://4.flac'}
          onClick={playRadio}
        />
        <CardIcon
          icon="synchronize-arrow-1"
          active={player.attributes.repeat === 'one'}
          onClick={() => {
            player.service.repeatSet({ repeat: 'one' })
          }}
          secondClick={() => {
            player.service.repeatSet({ repeat: 'off' })
          }}
        />
        <CardIcon icon="audio-file-search" disabled />
        <CardIcon icon="playlist-repeat" disabled />
        <CardIcon icon="audio-book-volume-high" disabled />
      </Stack>
    </Stack>
  )
}
