import { Card, Stack } from '@components'
import { useEntity } from '@hakit/core'
import { dateTime, useModal } from '@utils.ts'
import { addMinutes } from 'date-fns'
import React from 'react'

const Time = ({ time, children }: { time: number; children: React.ReactNode }) => {
  const { closeModal } = useModal()
  const end = useEntity('input_datetime.task_estimate_end')

  const handleClick = () => {
    closeModal()
    end.api.setDatetime({ datetime: dateTime(addMinutes(new Date(), time)) })
  }

  return (
    <Card size="stretch" style={{ flex: 1 }} onClick={handleClick}>
      {children}
    </Card>
  )
}

export const EstimateModal = () => {
  return (
    <Stack fullWidth style={{ marginTop: 'auto', height: 400, zIndex: 10 }}>
      <Stack column>
        <Time time={30}>40 min</Time>
        <Time time={50}>50 min</Time>
        <Time time={60}>1h</Time>
        <Time time={75}>1h 15min</Time>
        <Time time={90}>1h 30min</Time>
      </Stack>
      <Stack column>
        <Time time={5}>5 min</Time>
        <Time time={10}>10 min</Time>
        <Time time={15}>15 min</Time>
        <Time time={20}>20 min</Time>
        <Time time={25}>30 min</Time>
      </Stack>
      {/*<Time time={}>Custom</Time>*/}
    </Stack>
  )
}
