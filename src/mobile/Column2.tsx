import { Stack } from '@components'
import { Notifications, Player, Sequences } from '@mobile'

export const Column2 = () => {
  return (
    <Stack.MobileColumn>
      <Player />
      <Sequences />
      <Notifications />
    </Stack.MobileColumn>
  )
}
