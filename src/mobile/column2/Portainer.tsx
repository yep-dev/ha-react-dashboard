import { Card } from '@components'
import ky from 'ky'
import { useEffect, useState } from 'react'
import { useInterval } from 'react-use'

type Response = { State: string; Labels: Record<string, string> }[]

export const Portainer = () => {
  type TransformedData = { content: string }[]

  const [data, setData] = useState<TransformedData | null>(null)

  const fetchData = async () => {
    try {
      const response = await ky.get('https://10.0.0.100:9441/containers').json<Response>()
      const transformedData = response
        .filter(
          (entity) =>
            entity.State !== 'running' &&
            !['web-signifier'].includes(entity.Labels['com.docker.compose.project']),
        )
        .map((entity) => ({
          content: `${entity.Labels['com.docker.compose.service']} ${entity.State}`,
        }))
      setData(transformedData)
    } catch (error) {
      setData([{ content: "Couldn't fetch portainer data" }])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useInterval(fetchData, 10000)

  return (
    <>
      {data?.map((item) => (
        <Card.Padded key={item.content} align="flex-start">
          {item.content}
        </Card.Padded>
      ))}
    </>
  )
}
