import { SensorData } from '@stats/Stats.tsx'
import { addDays, format, getHours } from 'date-fns'
import ky from 'ky'
import { useEffect, useState } from 'react'

export const useRest = <T>(path: string, interval?: number): T | null => {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ky
          .get(import.meta.env.VITE_HA_URL + '/api/' + path, {
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
  startTime: string,
  endTime: string,
  startDate?: Date,
  endDate?: Date,
  interval = 10000,
): SensorData[] => {
  let start = new Date()
  let end = new Date()

  if (startDate && endDate) {
    start = startDate
    end = endDate
  } else {
    if (parseInt(startTime.substring(0, 2)) > parseInt(endTime.substring(0, 2))) {
      if (getHours(new Date()) > 22) {
        end = addDays(new Date(), 1)
      } else {
        start = addDays(new Date(), -1)
      }
    }
  }

  const path = `history/period/${
    format(start, 'yyyy-MM-dd') + 'T' + startTime
  }?filter_entity_id=${entity}&no_attributes&end_time=${format(end, 'yyyy-MM-dd') + 'T' + endTime}`

  const data = useRest<SensorData[][]>(path, interval)

  return data?.length ? data[0] : []
}
