import { Card, Modal, Stack } from '@components'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals/index.ts'
import { dateTime } from '@utils.ts'
import { addSeconds } from 'date-fns'

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
    end.service.setDatetime({ datetime: dateTime(addSeconds(new Date(), time * 60)) })
    start.service.setDatetime({ datetime: dateTime(new Date()) })
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
          <Time time={0.2}>12s</Time>
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
