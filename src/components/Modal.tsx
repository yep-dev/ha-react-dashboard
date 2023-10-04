import { colors } from '@constants'
import styled from '@emotion/styled'

export const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  background: ${colors.black};
  width: 630px;
  height: 540px;
`

type Props = {
  closeModal: () => void
  children: React.ReactNode
}

export const Modal = ({ closeModal, children }: Props) => {
  return (
    <ModalStyled onClick={closeModal}>
      <Overlay />
      <Right
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </Right>
    </ModalStyled>
  )
}
