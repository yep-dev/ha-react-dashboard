import { Card, Modal } from '@components'
import { useEntity } from '@hakit/core'
import { EstimateModal } from '@screens'
import { dateTime, useModal } from '@utils'
import { fromUnixTime } from 'date-fns'
import { useEffect, useState } from 'react'

type Props = {
  name: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'stretch'
}

export const Project = ({ name, color, size = 'stretch' }: Props) => {
  const [estimateModal, setEstimateModal] = useState(false)
  const select = useEntity('input_select.project').api.selectOption
  const estimateEnd = useEntity('input_datetime.task_estimate_end')
  const category = useEntity('input_select.category').state

  const { closeModal } = useModal()

  const handleClick = () => {
    setEstimateModal(true)
    select({ option: name })
    estimateEnd.api.setDatetime({ datetime: dateTime(fromUnixTime(0)) })
  }

  useEffect(() => {
    if (estimateEnd.state.startsWith('1970') && category !== 'Idling') {
      setEstimateModal(true)
    }
  }, [estimateEnd.state, category])

  return (
    <>
      <Card color={color} size={size} onClick={handleClick}>
        {name}
      </Card>

      {estimateModal && (
        <Modal
          closeModal={() => {
            setEstimateModal(false)
            closeModal(true)
          }}
        >
          <EstimateModal />
        </Modal>
      )}
    </>
  )
}
