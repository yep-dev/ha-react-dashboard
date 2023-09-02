import { colors } from '@constants'
import styled from '@emotion/styled'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  weight?: 'light' | 'normal' | 'bold'
  color?: 'main' | 'dark' | 'darker'
  textAlign?: string
}

export const Txt = styled.span<Props>`
  font-size: ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return '16px'
      case 'lg':
        return '28px'
      default:
        return '20px'
    }
  }};
  font-weight: ${({ weight = 'normal' }) => {
    switch (weight) {
      case 'light':
        return '300'
      case 'bold':
        return '700'
      default:
        return '400'
    }
  }};
  color: ${colors.white};
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
  text-wrap: nowrap;
`
