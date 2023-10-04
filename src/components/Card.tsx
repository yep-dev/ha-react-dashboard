import { Icon } from '@components'
import { Stack, StackContext, StackProps } from '@components/Stack.tsx'
import { colors } from '@constants'
import styled from '@emotion/styled'
import { useContext } from 'react'

type CardProps = {
  onClick?: () => void
  active?: boolean
  color?: string
  secondClick?(): void
  size?: 'sm' | 'md' | 'lg' | 'stretch' | 'inherit'
  beta?: boolean
} & StackProps

const StyledCard = styled(Stack)<CardProps & { disableRadius: boolean }>`
  background-color: ${({ active, color }) => (color ? color : active ? colors.light : colors.dark)};
  cursor: pointer;
  border-radius: ${({ disableRadius }) => (disableRadius ? 0 : 8)}px;
  opacity: ${({ beta = false }) => (beta ? 0.4 : 1)};
  padding: 0 6px;
`

StyledCard.defaultProps = {
  alignItems: 'center',
}

export const Card = ({
  active,
  onClick,
  secondClick,
  children,
  size,
  style,
  ...rest
}: CardProps) => {
  const disableRadius = useContext(StackContext)

  const handleClick = () => {
    if (active) {
      secondClick?.()
    } else {
      onClick?.()
    }
  }

  const sizeToHeightMap = {
    stretch: '100%',
    inherit: 'inherit',
    sm: 40,
    md: 50,
    lg: 60,
  }
  const height = sizeToHeightMap[size ?? 'md']

  return (
    <StyledCard
      onClick={handleClick}
      disableRadius={disableRadius}
      active={active}
      style={{ minHeight: height, maxHeight: height, ...style }}
      {...rest}
    >
      {children}
    </StyledCard>
  )
}

const CardIcon = ({ icon, ...props }: CardProps & { icon: string }) => (
  <Card {...props}>
    <Icon name={icon} />
  </Card>
)

Card.Icon = CardIcon
