import { Card, MainColumn, Modal } from '@components'
import { useEntity } from '@hakit/core'
import { ProjectModal } from '@screens'
import { useState } from 'react'

export const CurrentProject = () => {
  const [showModal, setShowModal] = useState(false)
  const task = useEntity('input_select.project').state

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <MainColumn>
      <Card
        size="lg"
        align="space-around"
        onClick={() => {
          setShowModal(true)
        }}
      >
        {task}
      </Card>
      {showModal && (
        <Modal closeModal={closeModal}>
          <ProjectModal closeModal={closeModal} />
        </Modal>
      )}
    </MainColumn>
  )
}
