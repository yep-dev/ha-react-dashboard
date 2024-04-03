import React, { createContext, useContext, useMemo, useState } from 'react'

type ModalData = {
  project?: object
  projectEntertainment?: object
  estimate?: { name: string }
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

  const value = useMemo(
    () => ({ modalsData, selectedData, openModal, closeModal }),
    [modalsData, selectedData],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export const useModal = <T extends ModalName>(modalName: T) => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  const { modalsData, selectedData, closeModal, openModal } = context

  const modalData = modalsData[modalName]
  const selectedModalData = selectedData[modalName]

  const open = (newData?: object) => {
    openModal(modalName, newData)
  }
  const close = (selectedData: object = {}) => {
    closeModal(modalName, selectedData)
  }

  return {
    isOpen: modalData !== undefined,
    modal: modalData,
    selected: selectedModalData,
    open,
    close,
  }
}
