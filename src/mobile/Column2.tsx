import { Stack } from '@components'
import { Notifications, Player, Portainer, Sequences } from '@mobile'

export const Column2 = () => {
  return (
    <Stack.MobileColumn>
      <Player />
      <Sequences />
      <Notifications />
      <Portainer />
    </Stack.MobileColumn>
  )
}
