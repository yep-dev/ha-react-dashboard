import styled from '@emotion/styled'
import { createContext, CSSProperties, FC } from 'react'

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
      'stretch',
      'alignItems',
      'transparent',
      'disableRadius',
      'beta',
      'active',
      'background',
      'fullWidth',
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
    flex: 1;
  }
`
export const StackContext = createContext<{ radius: boolean; color?: string }>({ radius: false })

export const Stack: FC<StackProps> = ({ children, radius, color, ...rest }) => (
  <StackContext.Provider value={{ radius: radius !== undefined, color }}>
    <StyledStack radius={radius} {...rest}>
      {children}
    </StyledStack>
  </StackContext.Provider>
)
