import { colors } from '@constants'
import styled from '@emotion/styled'
import { createContext } from 'react'

export const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
`

const Right = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 630px;
  height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const ChildrenWrapper = styled.div`
  margin: auto 0;
  background: ${colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
`
type Props = {
  closeModal: (next?: boolean) => void
  children: React.ReactNode
}
type ModalContextType = {
  closeModal: (next?: boolean) => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({ children, closeModal }: Props) => {
  return <ModalContext.Provider value={{ closeModal }}>{children}</ModalContext.Provider>
}

export const Modal = ({ closeModal, children }: Props) => (
  <ModalProvider closeModal={closeModal}>
    <ModalStyled
      onClick={() => {
        closeModal()
      }}
    >
      <Overlay />
      <Right>
        <ChildrenWrapper
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {children}
        </ChildrenWrapper>
      </Right>
    </ModalStyled>
  </ModalProvider>
)
