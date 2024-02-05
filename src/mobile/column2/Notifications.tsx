import { Card, Stack } from '@components'
import { useEffect, useState } from 'react'

type Notification = {
  name: string
  priority: number
}

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const ws = new WebSocket('wss://10.0.0.100:6400/ws/notifications')

    ws.onmessage = (event) => {
      setNotifications(JSON.parse(event.data))
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <Stack column>
      {notifications.map(({ name }) => (
        <Card.Padded key={name}>{name}</Card.Padded>
      ))}
    </Stack>
  )
}
