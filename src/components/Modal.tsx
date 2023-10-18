import { colors } from '@constants'
import styled from '@emotion/styled'
import { ModalName, useModal } from '@modals'

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
  name: ModalName
  children: React.ReactNode
}

export const Modal = ({ name, children }: Props) => {
  const { isOpen, close } = useModal(name)
  return isOpen ? (
    <ModalStyled onClick={close}>
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
  ) : null
}
