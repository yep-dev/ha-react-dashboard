import { InfoCard, Stack } from '@components'
import { useEntity } from '@hooks'

export const Sensors = () => {
  const officeTemperature = useEntity('sensor.sht_office_temperature')
  const officeHumidity = useEntity('sensor.sht_office_humidity')
  const officeAbsolute = useEntity('sensor.sht_office_absolute')

  return (
    <Stack column>
      <Stack gap={6}>
        {/*<InfoCard*/}
        {/*  icon="pollution-co2"*/}
        {/*  value={Number(co2.state)}*/}
        {/*  green={440}*/}
        {/*  orange={800}*/}
        {/*  red={1000}*/}
        {/*  invert*/}
        {/*/>*/}
        <InfoCard
          icon="temperature-thermometer"
          value={parseFloat(officeTemperature.state)}
          suffix="°C"
        />
        <InfoCard
          icon="blood-drop"
          value={parseFloat(officeHumidity.state)}
          suffix={`% / ${officeAbsolute.state}g`}
          red={40}
          green={55}
        />
      </Stack>
    </Stack>
  )
}
