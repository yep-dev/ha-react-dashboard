import { Card } from '@components/Card.tsx'
import { Icon } from '@components/Icon.tsx'
import { Txt } from '@components/Txt.tsx'

type NotificationProps = {
  onClick?(): void
  name: string
  description?: string
  color?: string
}

export const Notification = ({ onClick, name, description, color }: NotificationProps) => (
  <Card onClick={onClick} color={color} style={{ padding: '0 16px' }}>
    <div>
      <Txt size="lg">{name}</Txt>
      <Txt opacity="low" style={{ marginLeft: 4 }}>
        {' '}
        {description}
      </Txt>
    </div>
    {onclick && <Icon name="check-2" />}
  </Card>
)
