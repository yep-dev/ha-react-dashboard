import { Stack } from '@components'
import { Light, Notifications, Player, Portainer, Sequences } from '@mobile'

export const Column2 = () => {
  return (
    <Stack.MobileColumn>
      <Player />
      <Light />
      <Sequences />
      <Notifications />
      <Portainer />
    </Stack.MobileColumn>
  )
}
