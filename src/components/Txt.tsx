import { colors } from '@constants'
import styled from '@emotion/styled'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'light' | 'normal' | 'bold'
  opacity?: 'full' | 'mid' | 'low'
  textAlign?: string
}

export const Txt = styled.span<Props>`
  font-size: ${({ size = 'md' }) => {
    switch (size) {
      case 'xs':
        return '12px'
      case 'sm':
        return '16px'
      case 'lg':
        return '22px'
      case 'xl':
        return '28px'
      default:
        return '18px'
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
  opacity: ${({ opacity = 'main' }) => {
    switch (opacity) {
      case 'full':
        return '1'
      case 'mid':
        return '0.75'
      case 'low':
        return '0.5'
      default:
        return '1'
    }
  }};
  color: ${colors.white};
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
  text-wrap: nowrap;
`
