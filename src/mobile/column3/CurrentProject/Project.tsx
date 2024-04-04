import { Card, CardProps } from '@components'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals'

type Props = {
  name: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'stretch'
} & CardProps

export const Project = ({ name, color, size = 'stretch', ...props }: Props) => {
  const { open } = useModal('estimate')
  const project = useEntity('input_select.project')
  const task = useEntity('input_text.task')

  const handleClick = () => {
    open({ name })
    project.service.selectOption({ option: name })
    task.service.setValue({ value: '' })
  }

  return (
    <Card color={color} size={size} onClick={handleClick} fill outline {...props} value={name} />
  )
}
