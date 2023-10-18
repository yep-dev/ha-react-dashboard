import { EntertainmentModal, EstimateModal, ProjectModal, DmnModal } from '@modals'
import React, { createContext, useContext, useState } from 'react'

type ModalData = {
  project?: object
  projectEntertainment?: object
  estimate?: object
  dmn?: object
}

export type ModalName = keyof ModalData

type ModalContextType = {
  modals: ModalData
  openModal: (name: ModalName, data?: object) => void
  closeModal: (name: ModalName) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)
type Props = {
  children: React.ReactNode
}

export const ModalsProvider = ({ children }: Props) => {
  const [modals, setModals] = useState<ModalData>({})

  const openModal = (name: string, data: object | undefined) => {
    setModals((prev) => ({ ...prev, [name]: data ?? {} }))
  }

  const closeModal = (name: ModalName) => {
    setModals((prev) => {
      const { [name]: _, ...rest } = prev
      return rest
    })
  }

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (modalName: ModalName) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  const { modals, closeModal, openModal } = context

  const isOpen = modals[modalName] !== undefined
  const modalData = modals[modalName]

  const open = (newData?: object) => {
    openModal(modalName, newData)
  }
  const close = () => {
    closeModal(modalName)
  }

  return { isOpen, modalData, open, close }
}

export const Modals = () => {
  return (
    <>
      <ProjectModal />
      <EntertainmentModal />
      <EstimateModal />
      <DmnModal />
    </>
  )
}
