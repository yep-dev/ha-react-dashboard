import { Card } from '@components'
import { useEntity } from '@hakit/core'
import { useModal } from '@utils'

type Props = {
  name: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'stretch'
}

export const Project = ({ name, color, size = 'stretch' }: Props) => {
  const select = useEntity('input_select.project').api.selectOption
  const { closeModal } = useModal()

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
