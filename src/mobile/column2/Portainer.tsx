import { Card } from '@components'
import ky from 'ky'
import { useEffect, useState } from 'react'
import { useInterval } from 'react-use'

type Response = { State: string; Labels: Record<string, string> }[]

export const Portainer = () => {
  const [data, setData] = useState<Response | null>(null)

  const fetchData = async () => {
    try {
      const response = await ky.get('http://10.0.0.100:9441/containers').json()
      setData(response as Response)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  useInterval(fetchData, 10000)

  return data
    ? data
        .filter(
          (entity) =>
            entity.State != 'running' &&
            !['web-signifier'].includes(entity.Labels['com.docker.compose.project']),
        )
        .map((entity, i) => (
          <Card.Padded key={i} align="flex-start">
            {entity.Labels['com.docker.compose.service']} {entity.State}
          </Card.Padded>
        ))
    : null
}
