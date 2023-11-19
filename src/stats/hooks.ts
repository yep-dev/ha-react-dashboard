import { SensorData } from '@stats/Stats.tsx'
import { format } from 'date-fns'
import ky from 'ky'
import { useEffect, useState } from 'react'

const useHistoryStats = (
  entity: string,
  startTime = '09:00',
  endTime = '20:30',
  interval = 10000,
): SensorData[] | [] => {
  const [data, setData] = useState<SensorData[]>()

  const today = format(new Date(), 'yyyy-MM-dd') + 'T'
  startTime = today + startTime
  endTime = today + endTime

  const fetchData = async () => {
    const response = await ky
      .get(
        `${
          import.meta.env.VITE_HA_URL
        }/api/history/period/${startTime}?filter_entity_id=${entity}&no_attributes&end_time=${endTime}`,
        {
          headers: { Authorization: 'Bearer ' + import.meta.env.VITE_HA_TOKEN },
        },
      )
      .json<SensorData[][]>()
    setData(response[0])
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const intervalId = setInterval(fetchData, interval)
    return () => {
      clearInterval(intervalId)
    }
  }, [startTime, endTime, interval, fetchData])

  return data ?? []
}

export default useHistoryStats
