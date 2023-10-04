import { Card } from '@components'
import { useEntity } from '@hakit/core'

export const CurrentTask = () => {
  const task = useEntity('input_text.task').state

  return <Card align="space-around">{task}</Card>
}
