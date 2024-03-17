import { Card, Icon, Stack } from '@components'
import { colors } from '@constants'

type Props = {
  children?: React.ReactNode
  icon?: string
  text?: string
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
): string | undefined => {
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

  return undefined
}

export const InfoCard = ({ children, icon, suffix, value, green, orange, red, invert }: Props) => {
  const color = getColor(value, green, orange, red, invert)

  return (
    <Card gap={0} color={color} alignItems="center" align="center" size="sm">
      {icon && <Icon name={icon} style={{ marginLeft: 4 }} />}
      <Stack>
        {children && <div style={{ textAlign: 'left', marginLeft: 8 }}>{children}</div>}
        <div>
          {value}
          {suffix}
        </div>
      </Stack>
    </Card>
  )
}
