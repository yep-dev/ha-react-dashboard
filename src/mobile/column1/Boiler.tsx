import { Card, IncrementSelect, Stack } from '@components'
import { colors } from '@constants.ts'
import { useEntity } from '@hooks'

const steps = [0, 1, 2, 4, 7, 10, 15, 20]

export const Boiler = () => {
  const officeTemperature = useEntity('sensor.sht_office_temperature').number

  const dhwTemp = useEntity('sensor.boiler_wwcurtemp').number
  const dhwActivated = useEntity('switch.boiler_wwactivated')
  const current = useEntity('sensor.boiler_curflowtemp')
  const selected = useEntity('sensor.boiler_selflowtemp')
  const target = useEntity('sensor.boiler_targettemp')
  const offsetEntity = useEntity('input_number.boiler_offset')
  const offset = offsetEntity.number

  const handleOffsetChange = (newValue: number) => {
    offsetEntity.service.setValue({ value: newValue })
  }

  return (
    <Stack column>
      <Stack>
        <Card
          radius
          width="1/3"
          color={dhwActivated.bool ? colors.orange : dhwTemp >= 28 ? colors.green : undefined}
          onClick={() => {
            dhwActivated.service.toggle()
          }}
          value={`${dhwTemp}°C`}
        />
        <Stack radius>
          <Card align="space-around" radius={0} value="office" />
          <IncrementSelect
            options={steps}
            initialValue={officeTemperature}
            onChange={handleOffsetChange}
          >
            {officeTemperature}°C
          </IncrementSelect>
        </Stack>
      </Stack>

      <Stack radius>
        <Card value={`${current.state}°C / ${selected.state}°C (${target.state}°C)`} />
        <IncrementSelect options={steps} initialValue={offset} onChange={handleOffsetChange}>
          {offset !== 0 && '+'}
          {offset === 20 ? 'MAX' : offset}
        </IncrementSelect>
      </Stack>
    </Stack>
  )
}
