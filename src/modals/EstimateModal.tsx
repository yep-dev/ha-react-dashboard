import { Card, Modal, Stack } from '@components'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals/index.ts'
import { dateTime } from '@utils.ts'
import { addMinutes } from 'date-fns'

const Time = ({ time, children }: { time: number; children: React.ReactNode }) => {
  const { close } = useModal('estimate')
  const { close: closeProject } = useModal('project')
  const { close: closeEntertainment } = useModal('projectEntertainment')
  const end = useEntity('input_datetime.task_estimate_end')
  const start = useEntity('input_datetime.task_start')

  const handleClick = () => {
    close()
    closeProject()
    closeEntertainment()
    end.api.setDatetime({ datetime: dateTime(addMinutes(new Date(), time)) })
    start.api.setDatetime({ datetime: dateTime(new Date()) })
  }

  return (
    <Card size="stretch" style={{ flex: 1 }} onClick={handleClick}>
      {children}
    </Card>
  )
}

export const EstimateModal = () => {
  return (
    <Modal name="estimate">
      <Stack fullWidth style={{ marginTop: 'auto', height: 400, zIndex: 10 }}>
        <Stack column>
          <Time time={30}>30 min</Time>
          <Time time={45}>45 min</Time>
          <Time time={60}>1h</Time>
        </Stack>
        <Stack column>
          <Time time={1}>1 min</Time>
          <Time time={5}>5 min</Time>
          <Time time={10}>10 min</Time>
          <Time time={15}>15 min</Time>
          <Time time={20}>20 min</Time>
        </Stack>
      </Stack>
    </Modal>
  )
}
