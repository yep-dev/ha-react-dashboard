import { Mobile } from '@screens'
import { useEntity } from '@hakit/core'
import { useEffect } from 'react'

const App = () => {
  const refreshTrigger = useEntity('input_datetime.trigger_dashboard_reload').state

  useEffect(() => {
    if (refreshTrigger !== localStorage.getItem('refreshTrigger')) {
      localStorage.setItem('refreshTrigger', refreshTrigger)
      window.location.reload()
    }
  }, [refreshTrigger])

  return <Mobile />
}

export default App
