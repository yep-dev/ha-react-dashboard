import React, { createContext, useContext, useState } from 'react'

type ModalData = {
  project?: object
  projectEntertainment?: object
  estimate?: object
  dmn?: object
  sleep?: object
}

export type ModalName = keyof ModalData

type ModalContextType = {
  modalsData: ModalData
  selectedData: ModalData
  openModal: (name: ModalName, data?: object) => void
  closeModal: (name: ModalName, selectedData?: object) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)
type Props = {
  children: React.ReactNode
}

export const ModalsProvider = ({ children }: Props) => {
  const [modalsData, setModalsData] = useState<ModalData>({}) // data for open modal, set key = open
  const [selectedData, setSelectedData] = useState<ModalData>({}) // data from selecting option, saving last one

  const openModal = (name: string, data: object | undefined) => {
    setModalsData((prev) => ({ ...prev, [name]: data ?? {} }))
  }

  const closeModal = (name: ModalName, selectedData?: object) => {
    setSelectedData((prev) => ({ ...prev, [name]: selectedData }))
    setModalsData((prev) => {
      const { [name]: _, ...rest } = prev
      return rest
    })
  }

  return (
    <ModalContext.Provider value={{ modalsData, selectedData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (modalName: ModalName) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  const { modalsData, selectedData, closeModal, openModal } = context

  const modal = modalsData[modalName]

  const open = (newData?: object) => {
    openModal(modalName, newData)
  }
  const close = (selectedData = {}) => {
    closeModal(modalName, selectedData)
  }

  return { isOpen: modal !== undefined, modal, selected: selectedData[modalName], open, close }
}
