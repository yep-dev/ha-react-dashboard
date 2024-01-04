import styled from '@emotion/styled'
import { SensorData } from '@stats'
import { differenceInSeconds, parseISO } from 'date-fns'
import React from 'react'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 1920px;
`

const TimeSlot = styled.div<{ width: string }>`
  flex: 0 0 auto;
  height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: ${({ width }) => width};
`

const SlotInner = styled.div`
  padding: 0 3px;
`
type GanttChartProps = {
  data: SensorData[]
  getColor(state: string): string | string[]
  duration: number
}

export const GanttChart: React.FC<GanttChartProps> = ({
  data,
  getColor,
  duration: totalDuration,
}) => {
  const totalWidth = 1920

  const computeWidth = (current: SensorData, next: SensorData | undefined) => {
    const endTime = next ? parseISO(next.last_changed) : new Date()
    const startTime = parseISO(current.last_changed)
    const duration = differenceInSeconds(endTime, startTime)
    return `${(duration / 60 / totalDuration) * totalWidth}px`
  }

  return (
    <Container>
      {data.map((item, index) => {
        const nextItem = data[index + 1]
        const width = computeWidth(item, nextItem)
        const color = getColor(item.state)

        console.log(color)
        return (
          <TimeSlot
            key={index}
            width={width}
            style={
              Array.isArray(color)
                ? {
                    background: `linear-gradient(to bottom, ${color[0]} 50%, ${color[1]} 50%)`,
                  }
                : {
                    backgroundColor: color,
                  }
            }
          >
            <SlotInner>{item.state}</SlotInner>
          </TimeSlot>
        )
      })}
    </Container>
  )
}
