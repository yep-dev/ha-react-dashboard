import { SensorData } from '@stats/Stats.tsx'
import { format } from 'date-fns'
import ky from 'ky'
import { useEffect, useState } from 'react'

const useApi = <T>(path: string, interval?: number): T | null => {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ky
          .get(import.meta.env.VITE_HA_URL + path, {
            headers: { Authorization: 'Bearer ' + import.meta.env.VITE_HA_TOKEN },
          })
          .json<T>()
        setData(response)
      } catch (error) {
        console.error('API fetch error:', error)
        setData(null)
      }
    }

    fetchData()
    if (interval) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      const intervalId = setInterval(fetchData, interval)
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [path, interval])

  return data
}

export const useHistoryStats = (
  entity: string,
  startTime = '09:00',
  endTime = '20:30',
  interval = 10000,
): SensorData[] => {
  const today = format(new Date(), 'yyyy-MM-dd') + 'T'
  const start = today + startTime
  const end = today + endTime
  const path = `/api/history/period/${start}?filter_entity_id=${entity}&no_attributes&end_time=${end}`

  const data = useApi<SensorData[][]>(path, interval)

  return data ? data[0] : []
}

export default useHistoryStats
