import { colors } from '@constants'
import styled from '@emotion/styled'
import { Card } from '@components'
import { Icon } from '@iconify/react'

export const Container = styled(Card)<{ background: string }>`
  background-color: ${({ background }) => background};
  padding: 4px;
`

interface Props {
  icon: string
  suffix?: string
  value: number
  green?: number
  orange?: number
  red?: number
  invert?: boolean
}

const getColor = (
  value: number,
  green?: number,
  orange?: number,
  red?: number,
  invert?: boolean,
): string => {
  if (green !== undefined && value === green) return colors.green
  if (orange !== undefined && value === orange) return colors.orange
  if (red !== undefined && value === red) return colors.red

  if (invert) {
    if (green !== undefined && value < green) return colors.green
    if (red !== undefined && value > red) return colors.red
    if (orange !== undefined && value > orange) return colors.orange
  } else {
    if (green !== undefined && value > green) return colors.green
    if (red !== undefined && value < red) return colors.red
    if (orange !== undefined && value < orange) return colors.orange
  }

  return colors.dark
}

export const InfoCard = ({ icon, suffix, value, green, orange, red, invert }: Props) => {
  const background = getColor(value, green, orange, red, invert)

  return (
    <Container gap={0} column background={background} alignItems="center">
      <Icon icon={icon} height={24} />
      <div>
        {value}
        {suffix}
      </div>
    </Container>
  )
}
