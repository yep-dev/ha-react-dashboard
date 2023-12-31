import { Icon } from '@components'
import { Stack, StackContext, StackProps } from '@components/Stack.tsx'
import { colors } from '@constants'
import styled from '@emotion/styled'
import { useContext } from 'react'

type CardProps = {
  onClick?: () => void
  active?: boolean
  color?: string
  progress?: number
  secondClick?(): void
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'stretch' | 'inherit'
  beta?: boolean
} & StackProps

const StyledCard = styled(Stack)<CardProps & { disableRadius: boolean }>`
  cursor: pointer;
  border-radius: ${({ disableRadius }) => (disableRadius ? 0 : 8)}px;
  opacity: ${({ beta = false }) => (beta ? 0.4 : 1)};
  padding: 0 6px;
  flex: 1;
  position: relative;
  z-index: 0;
`

const ProgressBar = styled.div<{ progress: number; color: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: ${({ color }) => color};
  width: ${({ progress }) => `${progress * 100}%`};
  z-index: -1;
  transition: width 1s ease;
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
  progress,
  style,
  beta,
  ...rest
}: CardProps) => {
  const { radius, color } = useContext(StackContext)
  const handleClick = () => {
    if (!beta) {
      if (active) {
        secondClick?.()
      } else {
        onClick?.()
      }
    }
  }

  const sizeToHeightMap = {
    inherit: 'inherit',
    sm: 40,
    md: 50,
    lg: 60,
    xl: 80,
  }
  const height = size !== 'stretch' ? sizeToHeightMap[size ?? 'md'] : undefined
  if (size === 'stretch') {
    style = { ...style, flex: 1 }
  }

  const backgroundColor = rest.color ?? color ?? (active ? colors.light : colors.dark)

  return (
    <StyledCard
      onClick={handleClick}
      disableRadius={radius}
      color={rest.color ?? color}
      active={active}
      style={{ height, backgroundColor, ...style }}
      beta={beta}
      {...rest}
    >
      {!!progress && progress < 1 && <ProgressBar progress={progress} color={colors.light} />}
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

const CardPadded = styled(Card)`
  padding: 0 16px;
`

Card.Padded = CardPadded
