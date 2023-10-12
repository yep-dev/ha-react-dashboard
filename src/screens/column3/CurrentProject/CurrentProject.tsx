import { Card, Modal } from '@components'
import { categoryColors, colors } from '@constants.ts'
import { useEntity } from '@hakit/core'
import { ProjectModal } from '@screens'
import { useState } from 'react'

export const CurrentProject = () => {
  const [showModal, setShowModal] = useState(false)
  const project = useEntity('input_select.project').state
  const task = useEntity('input_text.task').state
  const category = useEntity('input_select.category').state

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Card
        size="lg"
        align="space-around"
        color={categoryColors[category.toLowerCase() as keyof typeof categoryColors] || colors.dark}
        onClick={() => {
          setShowModal(true)
        }}
      >
        {task || project}
      </Card>
      {showModal && (
        <Modal closeModal={closeModal}>
          <ProjectModal />
        </Modal>
      )}
    </>
  )
}
