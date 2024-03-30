import { InfoCard, Stack } from '@components'
import { useEntity } from '@hooks'

export const Energy = () => {
  const pvPower = useEntity('sensor.pv_power').state
  const energyLoad = useEntity('sensor.energy_load').state
  const activePower = useEntity('sensor.active_power').state
  const energyBalance = useEntity('sensor.energy_balance').number

  return (
    <Stack gap={6}>
      <InfoCard icon="flash-1" value={1} align="space-evenly">
        <span>{pvPower}W</span>-<span>{energyLoad}W</span>=<span>{activePower}W</span>
      </InfoCard>
      <InfoCard value={energyBalance} suffix="kWh" width={110} />
    </Stack>
  )
}
