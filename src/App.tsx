import { GlobalContext, GlobalData } from '@GlobalData'
import { useEntity } from '@hakit/core'
import { DayContext } from '@hooks.ts'
import { Mobile } from '@mobile'
import { ModalsProvider } from '@modals'
import { Stats } from '@stats'
import ky from 'ky'
import { useEffect, useState } from 'react'

const pages = {
  mobile: Mobile,
  stats: Stats,
} as const

const App = () => {
  const [globalData, setGlobalData] = useState<GlobalData>()
  const [isDay, setIsDay] = useState(new Date().getHours() < 22 && new Date().getHours() > 7)
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
        .get(import.meta.env.VITE_HA_URL + '/local/project.json')
        .json<GlobalData>()
      setGlobalData(response)
    }
    fetchData()
  }, [])

  // HA serves only index.html, on nested path, so path-based routing isn't feasible
  const queryParams = new URLSearchParams(window.location.search)
  const Component = pages[(queryParams.get('page') ?? 'mobile') as keyof typeof pages]

  // @ts-expect-error
  window.global = globalData

  return globalData ? (
    <GlobalContext.Provider value={globalData}>
      <DayContext.Provider value={{ isDay, setIsDay }}>
        <ModalsProvider>
          <Component />
        </ModalsProvider>
      </DayContext.Provider>
    </GlobalContext.Provider>
  ) : null
}

export default App
