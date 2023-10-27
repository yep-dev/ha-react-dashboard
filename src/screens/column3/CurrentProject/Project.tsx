import { Card } from '@components'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals'
import { dateTime } from '@utils'

type Props = {
  name: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'stretch'
}

export const Project = ({ name, color, size = 'stretch' }: Props) => {
  const { open } = useModal('estimate')
  const select = useEntity('input_select.project').api.selectOption
  const estimateEnd = useEntity('input_datetime.task_estimate_end')

  const handleClick = () => {
    open()
    select({ option: name })
    estimateEnd.api.setDatetime({ datetime: dateTime(new Date()) })
  }

  return (
    <>
      <Card color={color} size={size} onClick={handleClick}>
        {name}
      </Card>
    </>
  )
}
