import { Card, Icon } from '@components'

type Props = {
  icon: string
  text?: string
  onClick?(): void
}
export const IconLabel = ({ icon, onClick }: Props) => {
  return (
    <Card
      color="transparent"
      size="inherit"
      gap={0}
      align="center"
      onClick={onClick}
      style={{ alignItems: 'center', flex: 'none' }}
    >
      <Icon name={icon} />
      {/*{text && <Txt size="sm">{text}</Txt>}*/}
    </Card>
  )
}
