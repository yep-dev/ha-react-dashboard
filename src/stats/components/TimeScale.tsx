import styled from '@emotion/styled'
import { parseTime } from '@utils'
import { format } from 'date-fns'
import React from 'react'

const TimeScale = styled.div`
  display: flex;
  width: 1920px;
`

const HourMark = styled.div<{ width: string }>`
  flex: 0 0 auto;
  width: ${({ width }) => width};
  text-align: center;
  border-right: 1px solid white;
`

type TimeScaleComponentProps = {
  startTime: string // HH:mm
  endTime: string
  duration: number
}

export const TimeScaleComponent: React.FC<TimeScaleComponentProps> = ({ startTime, duration }) => {
  const start = parseTime(startTime)

  const generateHourMarks = () => {
    const numberOfHours = Math.ceil(duration / 60)
    const widthPerHour = 1920 / (duration / 60)
    console.log({ duration, numberOfHours, widthPerHour })

    return Array.from({ length: numberOfHours }, (_, index) => (
      <HourMark key={index} width={`${widthPerHour - 1}px`}>
        {format(new Date(start.getTime() + index * 60 * 60000), 'H')}
      </HourMark>
    ))
  }
  return <TimeScale>{generateHourMarks()}</TimeScale>
}
