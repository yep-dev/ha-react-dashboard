import { Stack, StackContext, StackProps } from '@components/Stack.tsx'
import { colors } from '@constants'
import styled from '@emotion/styled'
import { useContext } from 'react'

type CardProps = {
  onClick?: () => void
  active?: boolean
  transparent?: boolean
  secondClick?(): void
} & StackProps

const StyledCard = styled(Stack)<CardProps>`
  background-color: ${({ active, transparent }) =>
    transparent ? 'transparent' : active ? colors.light : colors.dark};
  padding: 6px;
  cursor: pointer;
`

export const Card = ({ active, onClick, secondClick, children, ...rest }: CardProps) => {
  const disableRadius = useContext(StackContext)

  const handleClick = () => {
    if (active) {
      secondClick?.()
    } else {
      onClick?.()
    }
  }

  return (
    <StyledCard
      onClick={handleClick}
      style={{
        backgroundColor: active ? colors.light : colors.dark,
        borderRadius: disableRadius ? 0 : 8,
      }}
      {...rest}
    >
      {children}
    </StyledCard>
  )
}
