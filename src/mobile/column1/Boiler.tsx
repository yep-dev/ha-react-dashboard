import { Card, Stack } from '@components'
import { useEntity } from '@hooks'
import { useCallback, useRef, useState } from 'react'

const steps = [0, 1, 2, 4, 7, 10, 15, 20, 21]

export const Boiler = () => {
  const current = useEntity('sensor.boiler_curflowtemp')
  const target = useEntity('sensor.boiler_targettemp')
  const offsetEntity = useEntity('input_number.boiler_offset')
  const offset = offsetEntity.number

  const longPressTimer = useRef<NodeJS.Timeout | undefined>()
  const [isLongPress, setIsLongPress] = useState(false)

  const handleOffsetChange = useCallback(
    (delta: number) => {
      if (!isLongPress) {
        const currentIndex = steps.findIndex((step) => step === offset)
        const newIndex = Math.min(Math.max(currentIndex + delta, 0), steps.length - 1)
        offsetEntity.service.setValue({ value: steps[newIndex] })
      }
    },
    [offset, offsetEntity.service, isLongPress],
  )

  const handleTouchStart = useCallback(
    (action: 'increment' | 'decrement') => {
      setIsLongPress(false)
      longPressTimer.current = setTimeout(() => {
        setIsLongPress(true)
        const value = action === 'increment' ? steps[steps.length - 1] : steps[0]
        offsetEntity.service.setValue({ value })
      }, 500)
    },
    [offsetEntity.service],
  )

  const handleTouchEnd = useCallback(() => {
    clearTimeout(longPressTimer.current)
  }, [])

  return (
    <Stack radius>
      <Card>
        {current.state}°C / {target.state}°C
      </Card>
      <Card.Icon
        icon="subtract"
        style={{ maxWidth: 45 }}
        onTouchStart={() => {
          handleTouchStart('decrement')
        }}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          handleOffsetChange(-1)
        }}
      />
      <Card style={{ maxWidth: 74 }}>
        {offset !== 0 && '+'}
        {offset === 21 ? 'MAX' : offset}
      </Card>
      <Card.Icon
        icon="add"
        style={{ maxWidth: 45 }}
        onTouchStart={() => {
          handleTouchStart('increment')
        }}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          handleOffsetChange(1)
        }}
      />
    </Stack>
  )
}
