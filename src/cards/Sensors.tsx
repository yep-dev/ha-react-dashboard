import { InfoCard, Stack } from '@components'
import { useEntity } from '@hakit/core'

export const Sensors = () => {
  const co2 = useEntity('sensor.co2')
  const xperiaBattery = useEntity('sensor.xperia_battery_level')
  const tabBattery = useEntity('sensor.tab_battery_level')

  return (
    <Stack gap={6}>
      <InfoCard
        icon="ic:baseline-co2"
        value={Number(co2.state)}
        green={440}
        orange={800}
        red={1000}
        invert
      />
      <InfoCard
        icon="ic:baseline-smartphone"
        suffix="%"
        value={Number(xperiaBattery.state)}
        green={80}
        orange={20}
        red={10}
      />
      <InfoCard
        icon="ic:baseline-tablet"
        suffix="%"
        value={Number(tabBattery.state)}
        green={80}
        orange={20}
        red={10}
      />
    </Stack>
  )
}
