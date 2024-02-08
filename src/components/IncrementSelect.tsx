import { Card } from '@components'
import { useCallback, useRef, useState } from 'react'

type IncrementSelectProps = {
  options: number[]
  initialValue: number
  onChange: (newValue: number) => void
  children: React.ReactNode
}

export const IncrementSelect = ({
  options,
  initialValue,
  onChange,
  children,
}: IncrementSelectProps) => {
  const longPressTimer = useRef<NodeJS.Timeout | undefined>()
  const [isLongPress, setIsLongPress] = useState(false)

  const handleValueChange = useCallback(
    (delta: number) => {
      if (!isLongPress) {
        const currentIndex = options.findIndex((option) => option === initialValue)
        const newIndex = Math.min(Math.max(currentIndex + delta, 0), options.length - 1)
        onChange(options[newIndex])
      }
    },
    [initialValue, isLongPress, onChange, options],
  )

  const handleTouchStart = useCallback(
    (action: 'increment' | 'decrement') => {
      setIsLongPress(false)
      longPressTimer.current = setTimeout(() => {
        setIsLongPress(true)
        const value = action === 'increment' ? options[options.length - 1] : options[0]
        onChange(value)
      }, 500)
    },
    [onChange, options],
  )

  const handleTouchEnd = useCallback(() => {
    clearTimeout(longPressTimer.current)
  }, [])

  return (
    <>
      <Card.Icon
        icon="subtract"
        style={{ maxWidth: 45 }}
        onTouchStart={() => {
          handleTouchStart('decrement')
        }}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          handleValueChange(-1)
        }}
      />
      <Card style={{ maxWidth: 74 }}>{children}</Card>
      <Card.Icon
        icon="add"
        style={{ maxWidth: 45 }}
        onTouchStart={() => {
          handleTouchStart('increment')
        }}
        onTouchEnd={handleTouchEnd}
        onClick={() => {
          handleValueChange(1)
        }}
      />
    </>
  )
}
