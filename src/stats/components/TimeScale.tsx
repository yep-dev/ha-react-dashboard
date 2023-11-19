import styled from '@emotion/styled'
import { differenceInMinutes, format, setHours, setMinutes } from 'date-fns'
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
}

export const TimeScaleComponent: React.FC<TimeScaleComponentProps> = ({ startTime, endTime }) => {
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return setMinutes(setHours(new Date(), hours), minutes)
  }
  const start = parseTime(startTime)
  const end = parseTime(endTime)

  const generateHourMarks = () => {
    const totalDuration = differenceInMinutes(end, start)
    const numberOfHours = Math.ceil(totalDuration / 60)
    const widthPerHour = 1920 / (differenceInMinutes(end, start) / 60)

    return Array.from({ length: numberOfHours }, (_, index) => (
      <HourMark key={index} width={`${widthPerHour}px`}>
        {format(new Date(start.getTime() + index * 60 * 60000), 'H')}
      </HourMark>
    ))
  }
  return <TimeScale>{generateHourMarks()}</TimeScale>
}
