import { Card, Modal, Stack } from '@components'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals/index.ts'
import { dateTime } from '@utils.ts'
import { addMinutes } from 'date-fns'
import { useDebounce } from 'react-use'

const Time = ({ time, children }: { time: number; children: React.ReactNode }) => {
  const { close } = useModal('estimate')
  const { close: closeProject } = useModal('project')
  const { close: closeEntertainment } = useModal('projectEntertainment')
  const end = useEntity('input_datetime.task_estimate_end')

  const handleClick = () => {
    close()
    closeProject()
    closeEntertainment()
    end.api.setDatetime({ datetime: dateTime(addMinutes(new Date(), time)) })
  }

  return (
    <Card size="stretch" style={{ flex: 1 }} onClick={handleClick}>
      {children}
    </Card>
  )
}

export const EstimateModal = () => {
  const { open, isOpen } = useModal('estimate')
  const estimateEnd = useEntity('input_datetime.task_estimate_end').state
  const category = useEntity('input_select.category').state

  useDebounce(() => {
    if (estimateEnd.startsWith('1970') && category !== 'Idling' && !isOpen) {
      open()
    }
  }, 1000)

  return (
    <Modal name="estimate">
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
      </Stack>
    </Modal>
  )
}
