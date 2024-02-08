import { Card, IncrementSelect, Stack } from '@components'
import { useEntity } from '@hooks'

const steps = [0, 1, 2, 4, 7, 10, 15, 20, 21]

export const Boiler = () => {
  const current = useEntity('sensor.boiler_curflowtemp')
  const target = useEntity('sensor.boiler_targettemp')
  const offsetEntity = useEntity('input_number.boiler_offset')
  const offset = offsetEntity.number

  const handleOffsetChange = (newValue: number) => {
    offsetEntity.service.setValue({ value: newValue })
  }

  return (
    <Stack radius>
      <Card>
        {current.state}°C / {target.state}°C
      </Card>
      <IncrementSelect options={steps} initialValue={offset} onChange={handleOffsetChange}>
        {offset !== 0 && '+'}
        {offset === 21 ? 'MAX' : offset}
      </IncrementSelect>
    </Stack>
  )
}
