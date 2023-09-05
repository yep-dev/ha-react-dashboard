import { useEntity } from '@hakit/core'
import { Card, IconLabel, Stack } from '@components'

export const AirConditioner = () => {
  const ac = useEntity('climate.room_air_conditioner')
  const setTemperature = (temperature: number) => {
    ac.api.setTemperature({ temperature })
  }

  const turnOff = () => {
    ac.api.turnOff()
  }

  const setPresetMode = (presetMode: string) => {
    if (ac.state === 'off') {
      ac.api.turnOn()
    }
    ac.api.setPresetMode({ preset_mode: presetMode })
  }

  const setFanMode = (fanMode: string) => {
    ac.api.setFanMode({ fan_mode: fanMode })
  }

  return (
    <Stack gap={0}>
      <IconLabel onClick={turnOff} icon="ic:round-ac-unit" text="AC" />
      <Stack column>
        <Stack radius>
          {[22, 23, 24, 25].map((temperature) => (
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
            active={ac.state === 'cool' && ac.attributes.preset_mode === 'quiet'}
          >
            Quiet
          </Card>
          <Card
            onClick={() => {
              setPresetMode('off')
              setFanMode('low')
            }}
            active={
              ac.state === 'cool' &&
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
              ac.state === 'cool' &&
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
            active={ac.state === 'cool' && ac.attributes.preset_mode === 'speed'}
          >
            Turbo
          </Card>
        </Stack>
      </Stack>
    </Stack>
  )
}
