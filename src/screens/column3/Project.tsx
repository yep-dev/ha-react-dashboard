import { Card } from '@components'
import { useEntity } from '@hakit/core'

type Props = {
  name: string
  color?: string
  closeModal: () => void
  size?: 'sm' | 'md' | 'lg' | 'stretch'
}

export const Project = ({ name, closeModal, color, size = 'stretch' }: Props) => {
  const select = useEntity('input_select.project').api.selectOption

  return (
    <Card
      color={color}
      size={size}
      onClick={() => {
        select({ option: name })
        closeModal()
      }}
    >
      {name}
    </Card>
  )
}
