import styled from '@emotion/styled'
import React, { memo } from 'react'
import { createContext, CSSProperties, FC, useMemo } from 'react'

export type StackProps = {
  gap?: number | string
  column?: boolean
  align?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  wrap?: CSSProperties['flexWrap']
  stretch?: boolean
  children?: React.ReactNode
  radius?: number | boolean
  color?: string
  fullWidth?: boolean
  fullHeight?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const StyledStack: FC<StackProps> = styled('div', {
  shouldForwardProp: (prop) =>
    ![
      'radius',
      'column',
      'alignItems',
      'transparent',
      'disableRadius',
      'disabled',
      'fill',
      'wrap',
      'active',
      'stretch',
      'background',
      'fullWidth',
      'gap',
      'fullHeight',
    ].includes(prop),
})<StackProps>`
  display: flex;
  gap: ${({ gap = 4 }) => gap}px;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  justify-content: ${({ align = 'center' }) => align};
  align-items: ${({ alignItems = 'auto' }) => alignItems};
  flex-wrap: ${({ wrap = 'nowrap' }) => wrap};
  border-radius: ${({ radius }) => (radius ? (typeof radius === 'number' ? radius : 10) : 0)}px;
  overflow: hidden;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'auto')};

  & > div {
    ${({ stretch = true }) => stretch && 'flex: 1; height: 100%'}
  }
`

export const StackContext = createContext<{ radius: boolean; color?: string }>({ radius: false })

export const Stack = memo(({ children, radius, color, ...rest }: StackProps) => {
  const context = useMemo(() => ({ radius: radius !== undefined, color }), [radius, color])
  return (
    <StackContext.Provider value={context}>
      <StyledStack radius={radius} {...rest}>
        {children}
      </StyledStack>
    </StackContext.Provider>
  )
})
Stack.displayName = 'Stack'

export const MobileColumn = styled(Stack)`
  min-width: 414px;
  max-width: 414px;
  min-height: 540px;

  & > div {
    flex: none;
  }
`

MobileColumn.defaultProps = {
  column: true,
  align: 'flex-start',
  gap: 8,
}

export const StackOutlined = ({ style, ...props }: StackProps) => (
  <Stack
    radius
    style={{ border: `2px solid ${props.color}`, boxSizing: 'border-box', gap: 0, ...style }}
    {...props}
  />
)
