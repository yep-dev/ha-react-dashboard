import { Card, Icon, Stack } from '@components'
import { useEntity } from '@hooks'

export const AirConditioner = () => {
  const ac = useEntity('climate.conditioner_office')
  const heating = useEntity('input_boolean.heating').bool
  const setTemperature = (temperature: number) => {
    ac.service.setTemperature({ temperature })
  }

  const turnOff = () => {
    ac.service.turnOff()
  }

  const setPresetMode = (presetMode: string) => {
    if (ac.state === 'off') {
      ac.service.turnOn()
    }
    ac.service.setPresetMode({ preset_mode: presetMode })
  }

  const setFanMode = (fanMode: string) => {
    ac.service.setFanMode({ fan_mode: fanMode })
  }

  const temps = heating ? [25, 26, 27, 30] : [22, 23, 24, 25]

  return (
    <Stack gap={0}>
      {/*<IconLabel onClick={turnOff} icon="temperature-snowflake-1" text="AC" />*/}
      <Icon
        name="temperature-snowflake-1"
        onClick={turnOff}
        style={{ alignSelf: 'center', margin: '0 6px' }}
      />
      <Stack column>
        <Stack radius>
          {temps.map((temperature) => (
            <Card
              onClick={() => {
                setTemperature(temperature)
              }}
              key={temperature}
              active={ac.attributes.temperature === temperature}
            >
              {temperature}
            </Card>
          ))}
        </Stack>
        <Stack radius>
          <Card
            onClick={() => {
              setPresetMode('quiet')
            }}
            active={ac.state !== 'off' && ac.attributes.preset_mode === 'quiet'}
          >
            Quiet
          </Card>
          <Card
            onClick={() => {
              setPresetMode('off')
              setFanMode('low')
            }}
            active={
              ac.state !== 'off' &&
              ac.attributes.preset_mode === 'off' &&
              ac.attributes.fan_mode === 'low'
            }
          >
            Low
          </Card>
          <Card
            onClick={() => {
              setPresetMode('off')
              setFanMode('auto')
            }}
            active={
              ac.state !== 'off' &&
              ac.attributes.preset_mode === 'off' &&
              ac.attributes.fan_mode === 'auto'
            }
          >
            Auto
          </Card>
          <Card
            onClick={() => {
              setPresetMode('speed')
            }}
            active={ac.state !== 'off' && ac.attributes.preset_mode === 'speed'}
          >
            Turbo
          </Card>
        </Stack>
      </Stack>
    </Stack>
  )
}
