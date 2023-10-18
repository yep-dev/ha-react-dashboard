import { useEntity } from '@hakit/core'
import { Modals, ModalsProvider } from '@modals'
import { Mobile } from '@screens'
import { useEffect } from 'react'

const App = () => {
  const refreshTrigger = useEntity('input_datetime.trigger_dashboard_reload').state

  useEffect(() => {
    if (refreshTrigger !== localStorage.getItem('refreshTrigger')) {
      localStorage.setItem('refreshTrigger', refreshTrigger)
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  }, [refreshTrigger])

  return (
    <ModalsProvider>
      <Mobile />
      <Modals />
    </ModalsProvider>
  )
}

export default App
