import { Card } from '@components'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals'

type Props = {
  name: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'stretch'
}

export const Project = ({ name, color, size = 'stretch' }: Props) => {
  const { open } = useModal('estimate')
  const select = useEntity('input_select.project')

  const handleClick = () => {
    open()
    select.service.selectOption({ option: name })
  }

  return (
    <>
      <Card color={color} size={size} onClick={handleClick}>
        {name}
      </Card>
    </>
  )
}
