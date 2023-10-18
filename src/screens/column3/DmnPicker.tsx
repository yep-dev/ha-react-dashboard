import { Card } from '@components'
import { useModal } from '@modals'

export const DmnPicker = () => {
  const { open } = useModal('dmn')

  return (
    <Card size="lg" align="space-around" onClick={open}>
      DMN
    </Card>
  )
}
