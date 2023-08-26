import { Mobile } from '@screens'
import { HassConnect } from '@hakit/core'

const App = () => {
  return (
    <HassConnect hassUrl={(import.meta.env.VITE_HA_URL as string | undefined) ?? ''}>
      <Mobile />
    </HassConnect>
  )
}

export default App
