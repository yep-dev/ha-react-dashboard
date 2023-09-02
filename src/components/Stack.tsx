import { CSSProperties, FC } from 'react'
import styled from '@emotion/styled'

type Props = {
  gap?: number | string
  column?: boolean
  align?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  wrap?: CSSProperties['flexWrap']
  stretch?: boolean
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const Stack: FC<Props> = styled.div<Props>`
  display: flex;
  gap: ${({ gap = 8 }) => gap}px;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  justify-content: ${({ align = 'center' }) => align};
  align-items: ${({ alignItems = 'auto' }) => alignItems};
  flex-wrap: ${({ wrap = 'nowrap' }) => wrap};

  & > div {
    flex: 1;
  }
`
