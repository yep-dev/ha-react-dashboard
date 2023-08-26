import { colors } from '@constants'
import styled from '@emotion/styled'
import { Stack } from '@components'

interface CardProps {
  transparent?: boolean
}

export const Card = styled(Stack)<CardProps>`
  background-color: ${({ transparent }) => (transparent ? 'transparent' : colors.dark)};
  padding: 6px;
  border-radius: 8px;
`
