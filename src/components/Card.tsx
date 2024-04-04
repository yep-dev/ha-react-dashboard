import { Icon } from '@components'
import { Stack, StackContext, StackProps } from '@components/Stack.tsx'
import { colors } from '@constants'
import styled from '@emotion/styled'
import { HassEntityWithService } from '@hakit/core'
import { rgba } from 'polished'
import { memo, useContext, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const widthPresets = {
  '1/3': 132.6,
  '1/4': 100,
}

export type CardProps = {
  onClick?: () => void
  active?: boolean | null
  color?: string
  secondClick?(): void
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'stretch' | 'inherit'
  disabled?: boolean
  width?: '1/3' | '1/4' | number
  fill?: boolean
  transparent?: boolean
  outline?: boolean
  value?: string | number | React.ReactNode
} & StackProps

const getWidth = (width?: keyof typeof widthPresets | number) => {
  if (!width) {
    return 'auto'
  } else if (typeof width === 'number') {
    return `${width}px`
  } else if (width in widthPresets) {
    return `${widthPresets[width]}px`
  }
}

const StyledCard = styled(Stack)<CardProps & { disableRadius: boolean }>`
  cursor: pointer;
  min-width: ${({ width }) => getWidth(width)};
  max-width: ${({ width }) => getWidth(width)};
  border-radius: ${({ disableRadius }) => (disableRadius ? 0 : 8)}px;
  opacity: ${({ disabled = false }) => (disabled ? 0.4 : 1)};
  padding: 0 6px;
  flex: 1;
  position: relative;
  z-index: 0;
  box-sizing: border-box;

  ${({ radius }) =>
    radius &&
    `
    box-sizing: border-box;
    padding: 0;
    gap: 0;
    border-radius: 8px
  `}
`
const sizeToHeightMap = {
  inherit: 'inherit',
  sm: 40,
  md: 50,
  lg: 60,
  xl: 80,
}
StyledCard.defaultProps = {
  alignItems: 'center',
}

export const Card = memo(
  ({
    active,
    onClick,
    secondClick,
    value,
    size,
    style: incomingStyle,
    disabled,
    outline,
    children,
    ...rest
  }: CardProps) => {
    const { radius, color: contextColor } = useContext(StackContext)
    const color = rest.color ?? contextColor

    const handleClick = useMemo(
      () => (disabled ? undefined : active ? secondClick : onClick),
      [active, disabled, onClick, secondClick],
    )

    const height = useMemo(
      () => (size !== 'stretch' ? sizeToHeightMap[size ?? 'md'] : undefined),
      [size],
    )
    const backgroundColor = useMemo(() => {
      if (rest.fill && color) {
        return rgba(color, 0.25)
      } else {
        return rest.transparent ? 'transparent' : active ? colors.light : colors.dark
      }
    }, [rest.fill, color, rest.transparent, active])

    const style = useMemo(
      () => ({
        ...incomingStyle,
        flex: size === 'stretch' ? 1 : undefined,
        minHeight: height,
        maxHeight: height,
        backgroundColor,
        outline: outline && color ? `1px solid ${color}` : 'none',
        border: !outline && color ? `2px solid ${color}` : 'none',
      }),
      [incomingStyle, backgroundColor, size, height, color, outline],
    )

    return (
      <ErrorBoundary
        fallback={<StyledCard disableRadius={radius} color={colors.light} value="error" />}
      >
        <StyledCard
          onClick={handleClick}
          disableRadius={radius}
          color={color}
          active={active}
          style={style}
          disabled={disabled}
          {...rest}
        >
          {value ?? children}
        </StyledCard>
      </ErrorBoundary>
    )
  },
)
Card.displayName = 'Card'

export const CardSwitch = memo(
  ({ entity, ...props }: CardProps & { entity: HassEntityWithService<'switch'> }) => (
    <Card
      onClick={() => {
        entity.service.toggle()
      }}
      color={entity.state === 'on' ? colors.light : undefined}
      {...props}
    />
  ),
)
CardSwitch.displayName = 'CardSwitch'

export const CardIcon = memo(({ icon, ...props }: Omit<CardProps, 'value'> & { icon: string }) => (
  <Card {...props}>
    <Icon name={icon} />
  </Card>
))
CardIcon.displayName = 'CardIcon'
