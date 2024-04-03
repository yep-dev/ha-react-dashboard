import { Notification, Stack } from '@components'
import { colors } from '@constants'
import { useEffect, useState } from 'react'

type Data = {
  priority: number
}

export const Notifications = () => {
  const [notifications, setNotifications] = useState<{[key:string]: Data}>({})

  useEffect(() => {
    const ws = new WebSocket('wss://10.0.0.100:6400/ws/notifications?initial=true')
    ws.onmessage = (event) => {
      setNotifications(JSON.parse(event.data))
    }
    return () => {
      ws.close()
    }
  }, [])

  return (
    <Stack column>
      {Object.entries(notifications).map(([name, data]) => (
        <Notification name={name} key={name} color={colors.green} />
      ))}
    </Stack>
  )
}
