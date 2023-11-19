import { GlobalContext, GlobalData } from '@GlobalData'
import { useEntity } from '@hakit/core'
import { ModalsProvider } from '@modals'
import { Mobile } from '@mobile'
import { Stats } from '@stats'
import ky from 'ky'
import { useEffect, useState } from 'react'

const pages = {
  mobile: Mobile,
  stats: Stats,
} as const

const App = () => {
  const [globalData, setGlobalData] = useState<GlobalData>()
  const refreshTrigger = useEntity('input_datetime.trigger_dashboard_reload').state

  useEffect(() => {
    if (refreshTrigger !== localStorage.getItem('refreshTrigger')) {
      localStorage.setItem('refreshTrigger', refreshTrigger)
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  }, [refreshTrigger])

  useEffect(() => {
    const fetchData = async () => {
      const response = await ky
        .get(import.meta.env.VITE_HA_URL + '/local/data.json')
        .json<GlobalData>()
      setGlobalData(response)
    }
    fetchData()
  }, [])

  const queryParams = new URLSearchParams(window.location.search)
  const Component = pages[(queryParams.get('page') ?? 'mobile') as keyof typeof pages]

  return globalData ? (
    <GlobalContext.Provider value={globalData}>
      <ModalsProvider>
        <Component />
      </ModalsProvider>
    </GlobalContext.Provider>
  ) : null
}

export default App
