import { MainColumn } from '@components'
import { Notifications, Player } from '@screens'

export const Column2 = () => {
  return (
    <MainColumn>
      <Player />
      <Notifications />
    </MainColumn>
  )
}
