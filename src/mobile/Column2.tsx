import { MobileColumn } from '@components'
import { Light, Notifications, Player, Portainer, Sequences } from '@mobile'

export const Column2 = () => {
  return (
    <MobileColumn>
      <Player />
      <Light />
      <Sequences />
      <Notifications />
      <Portainer />
    </MobileColumn>
  )
}
