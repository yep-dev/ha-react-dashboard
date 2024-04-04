import { InfoCard, Stack } from '@components'
import { useEntity } from '@hooks'

export const Battery = () => {
  const bandBattery = useEntity('sensor.band_battery')
  const xperiaPower = useEntity('sensor.xperia_battery_power').number
  const xperiaBattery = useEntity('sensor.xperia_battery_level')
  const xperiaCharging = useEntity('sensor.xperia_battery_state')
  const lgBattery = useEntity('sensor.lg_battery_level')
  const lgCharging = useEntity('sensor.lg_battery_state')
  const tabBattery = useEntity('sensor.tab_battery_level')
  const tabCharging = useEntity('sensor.tab_battery_state')
  const macBattery = useEntity('sensor.mac_internal_battery_level')
  const macCharging = useEntity('sensor.mac_internal_battery_state')

  return (
    <Stack column>
      <Stack gap={6}>
        <Stack radius>
          <InfoCard
            icon="mobile-phone-2"
            suffix="%"
            value={Number(xperiaBattery.state)}
            green={xperiaCharging.state === 'charging' ? 80 : undefined}
            orange={xperiaCharging.state === 'charging' ? undefined : 20}
            red={xperiaCharging.state === 'charging' ? undefined : 10}
          />
          <InfoCard value={xperiaPower} icon="flash-1" suffix="W" />
        </Stack>

        <InfoCard
          icon="smart-watch-square"
          suffix="%"
          value={Number(bandBattery.state)}
          green={100}
          orange={20}
          red={10}
          width="1/3"
        />
      </Stack>
      <Stack gap={6}>
        <InfoCard
          icon="mobile-phone"
          suffix="%"
          value={Number(lgBattery.state)}
          green={lgCharging.state === 'charging' ? 80 : undefined}
          orange={lgCharging.state === 'charging' ? undefined : 20}
          red={lgCharging.state === 'charging' ? undefined : 10}
        />
        <InfoCard
          icon="tablet-1"
          suffix="%"
          value={Number(tabBattery.state)}
          green={tabCharging.state === 'charging' ? 80 : undefined}
          orange={tabCharging.state === 'charging' ? undefined : 20}
          red={tabCharging.state === 'charging' ? undefined : 10}
        />
        <InfoCard
          icon="laptop"
          suffix="%"
          value={Number(macBattery.state)}
          green={macCharging.state === 'charging' ? 80 : undefined}
          orange={macCharging.state === 'charging' ? undefined : 10}
          red={macCharging.state === 'charging' ? undefined : 5}
        />
      </Stack>
    </Stack>
  )
}
