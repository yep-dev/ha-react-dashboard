import { Notification } from '@components'
import { colors } from '@constants'
import { EntityName, HassEntityWithService, useEntity } from '@hakit/core'
import { useRest } from '@hooks'

const Sequence = ({ name }: { name: string }) => {
  const sequence = useEntity(name as EntityName) as unknown as HassEntityWithService<'input_select'>
  const flags = sequence.state.split(' | ')[1] || ''.split(' ')
  const check = flags.includes('check')

  const handleClick = () => {
    sequence.service.selectNext()
  }

  return (
    sequence.state !== 'none' && (
      <Notification
        name={sequence.state.split(' | ')[0]}
        description={name.split('sequence_')[1]}
        color={colors.green}
        onClick={check ? handleClick : undefined}
      />
    )
  )
}

export const Sequences = () => {
  const states = useRest<{ entity_id: string }[]>('states')
  const sequence_names = states?.filter((state: { entity_id: string }) =>
    state.entity_id.startsWith('input_select.sequence_'),
  )

  return sequence_names
    ? sequence_names.map((sequence) => (
        <Sequence key={sequence.entity_id} name={sequence.entity_id} />
      ))
    : null
}
