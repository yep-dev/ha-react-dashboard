import { Card, IncrementSelect, Stack } from '@components'
import { useEntity } from '@hooks'

const steps = [0, 1, 2, 4, 7, 10, 15, 20]

export const Boiler = () => {
  const officeTemperature = useEntity('sensor.sht_office_temperature').state

  const current = useEntity('sensor.boiler_curflowtemp')
  const selected = useEntity('sensor.boiler_selflowtemp')
  const target = useEntity('sensor.boiler_targettemp')
  const offsetEntity = useEntity('input_number.boiler_offset')
  const offset = offsetEntity.number

  const handleOffsetChange = (newValue: number) => {
    offsetEntity.service.setValue({ value: newValue })
  }

  return (
    <Stack column radius>
      <Stack radius={0}>
        <Card align="space-around">
          <span>Office</span>
          <span>{officeTemperature}°C</span>
        </Card>
        <IncrementSelect options={steps} initialValue={offset} onChange={handleOffsetChange}>
          {offset !== 0 && '+'}
          {offset === 20 ? 'MAX' : offset}
        </IncrementSelect>
      </Stack>

      <Stack radius={0}>
        <Card>
          {current.state}°C / {selected.state}°C ({target.state}°C)
        </Card>
        <IncrementSelect options={steps} initialValue={offset} onChange={handleOffsetChange}>
          {offset !== 0 && '+'}
          {offset === 20 ? 'MAX' : offset}
        </IncrementSelect>
      </Stack>
    </Stack>
  )
}
