import { InfoCard, Stack } from '@components'
import { useEntity } from '@hakit/core'

export const Sensors = () => {
  const co2 = useEntity('sensor.co2')
  const bandBattery = useEntity('sensor.band_battery')
  const xperiaBattery = useEntity('sensor.xperia_battery_level')
  const xperiaCharging = useEntity('sensor.xperia_battery_state')
  const tabBattery = useEntity('sensor.tab_battery_level')
  const tabCharging = useEntity('sensor.tab_battery_state')
  const officeTemperature = useEntity('sensor.office_temperature')

  return (
    <Stack column>
      <Stack gap={6}>
        <InfoCard
          icon="mobile-phone-2"
          suffix="%"
          value={Number(xperiaBattery.state)}
          green={xperiaCharging.state === 'charging' ? 80 : undefined}
          orange={xperiaCharging.state === 'charging' ? undefined : 20}
          red={xperiaCharging.state === 'charging' ? undefined : 10}
        />
        <InfoCard
          icon="smart-watch-square"
          suffix="%"
          value={Number(bandBattery.state)}
          green={100}
          orange={20}
          red={10}
        />
        <InfoCard
          icon="tablet-1"
          suffix="%"
          value={Number(tabBattery.state)}
          green={tabCharging.state === 'charging' ? 80 : undefined}
          orange={tabCharging.state === 'charging' ? undefined : 20}
          red={tabCharging.state === 'charging' ? undefined : 10}
        />
      </Stack>
      <Stack gap={6}>
        <InfoCard
          icon="pollution-co2"
          value={Number(co2.state)}
          green={440}
          orange={800}
          red={1000}
          invert
        />
        <InfoCard
          icon="temperature-thermometer"
          value={Math.round(parseFloat(officeTemperature.state) * 10) / 10}
        />
      </Stack>
    </Stack>
  )
}
