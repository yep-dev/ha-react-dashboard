import { Card } from '@components'
import { categoryColors } from '@constants.ts'
import { useEntity } from '@hakit/core'
import { useModal } from '@modals'

export const CurrentProject = () => {
  const { open } = useModal('project')
  const project = useEntity('input_select.project').state
  const task = useEntity('input_text.task').state
  const category = useEntity('input_select.category').state

  return (
    <>
      <Card
        size="xl"
        align="space-around"
        color={categoryColors[category.toLowerCase() as keyof typeof categoryColors]}
        style={{ borderWidth: 3 }}
        onClick={project === 'sleepy' ? undefined : open}
        fill
        value={task || project}
      />
    </>
  )
}
