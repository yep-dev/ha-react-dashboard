import { InfoCard, Stack } from '@components'
import { useEntity } from '@hakit/core'

export const Sensors = () => {
  const co2 = useEntity('sensor.co2')
  const xperiaBattery = useEntity('sensor.xperia_battery_level')
  const xperiaCharging = useEntity('sensor.xperia_battery_state')
  const tabBattery = useEntity('sensor.tab_battery_level')
  const tabCharging = useEntity('sensor.tab_battery_state')

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
        green={xperiaCharging.state === 'charging' ? 80 : undefined}
        orange={xperiaCharging.state === 'charging' ? undefined : 20}
        red={xperiaCharging.state === 'charging' ? undefined : 10}
      />
      <InfoCard
        icon="ic:baseline-tablet"
        suffix="%"
        value={Number(tabBattery.state)}
        green={tabCharging.state === 'charging' ? 80 : undefined}
        orange={tabCharging.state === 'charging' ? undefined : 20}
        red={tabCharging.state === 'charging' ? undefined : 10}
      />
    </Stack>
  )
}
