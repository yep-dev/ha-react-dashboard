import { Icon } from '@iconify/react'
import { Card } from '@components'

interface Props {
  icon: string
  text?: string
  onClick?(): void
}
export const IconLabel = ({ icon, onClick }: Props) => {
  return (
    <Card
      transparent
      gap={0}
      column
      align="center"
      onClick={onClick}
      style={{ alignItems: 'center', flex: 'none' }}
    >
      <Icon icon={icon} height={24} />
      {/*{text && <Txt size="sm">{text}</Txt>}*/}
    </Card>
  )
}
