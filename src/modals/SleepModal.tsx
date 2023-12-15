import { Card, Modal, Stack } from '@components'
import { useModal } from '@modals/index.ts'

const Time = ({ time, children }: { time: number; children: React.ReactNode }) => {
  const { close } = useModal('sleep')

  const handleClick = () => {
    close({ time })
    // todo: edit  current sleep event when service/API for it becomes available
  }

  return (
    <Card size="stretch" style={{ flex: 1 }} onClick={handleClick}>
      {children}
    </Card>
  )
}

export const SleepModal = () => {
  return (
    <Modal name="sleep">
      <Stack fullWidth style={{ marginTop: 'auto', height: 450, zIndex: 10 }}>
        <Stack column>
          {process.env.NODE_ENV === 'development' && <Time time={0.2}>12s</Time>}
          <Time time={200}>3h 20min</Time>
          <Time time={280}>4h 40min</Time>
          <Time time={370}>6h 10min</Time>
        </Stack>
        <Stack column>
          <Time time={35}>35m</Time>
          <Time time={100}>1h 40m</Time>
          <Time time={150}>2h 30min</Time>
        </Stack>
      </Stack>
    </Modal>
  )
}
