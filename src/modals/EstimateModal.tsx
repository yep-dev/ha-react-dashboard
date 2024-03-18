import { Card, Modal, Stack } from '@components'
import { estimate } from '@data'
import { GlobalContext } from '@GlobalData.ts'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals/index.ts'
import { dateTime } from '@utils.ts'
import { addSeconds } from 'date-fns'
import * as process from 'process'
import { useContext } from 'react'

const Time = ({ time, children }: { time: number; children: React.ReactNode }) => {
  const { close } = useModal('estimate')
  const { close: closeProject } = useModal('project')
  const { close: closeEntertainment } = useModal('projectEntertainment')
  const end = useEntity('input_datetime.task_estimate_end')
  const start = useEntity('input_datetime.task_start')

  const handleClick = () => {
    close({ time })
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
  const { modal } = useModal('estimate')
  const { projectCategory } = useContext(GlobalContext).categories

  const name = modal?.name
  const times =
    // @ts-expect-error
    name && ((estimate[name] || estimate[projectCategory[name]]) as number[] | undefined)

  if (!times) {
    return null
  }

  const num1 = Math.floor(times.length / 3) + (times.length % 3 > 0 ? 1 : 0)
  const num2 = Math.floor(times.length / 3) + (times.length % 3 > 1 ? 1 : 0) + num1
  const num3 = Math.floor(times.length / 3) + num2

  return (
    <Modal name="estimate">
      <Stack fullWidth style={{ marginTop: 'auto', height: 350, zIndex: 10 }}>
        <Stack column>
          {process.env.NODE_ENV === 'development' && <Time time={0.2}>12s</Time>}
          {times.slice(num2, num3).map((time) => (
            <Time time={time} key={time}>
              {time} min
            </Time>
          ))}
        </Stack>
        <Stack column>
          {times.slice(num1, num2).map((time) => (
            <Time time={time} key={time}>
              {time} min
            </Time>
          ))}
        </Stack>
        <Stack column>
          {times.slice(0, num1).map((time) => (
            <Time time={time} key={time}>
              {time} min
            </Time>
          ))}
        </Stack>
      </Stack>
    </Modal>
  )
}
