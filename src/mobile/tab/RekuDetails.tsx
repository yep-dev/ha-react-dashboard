import { InfoCard, Stack } from '@components'
import { useEntity } from '@hooks'

export const RekuDetails = () => {
  const intake = useEntity('sensor.reku_temp_intake').number
  const extract = useEntity('sensor.reku_temp_extract').state
  const supply = useEntity('sensor.reku_temp_supply').state

  return (
    <Stack gap={6}>
      <InfoCard icon="temperature-thermometer" value={1} align="space-evenly">
        <span>{extract}°C</span>
        {'-->'}
        <span>{supply}°C</span>
      </InfoCard>
      <InfoCard value={intake} suffix="°C" width="1/3" />
    </Stack>
  )
}
