import { useEntity } from '@hakit/core'
import { IconLabel, Sections, Stack } from '@components'

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
      <Stack column gap={4}>
        <Sections<number>
          items={[{ value: 22 }, { value: 23 }, { value: 24 }, { value: 25 }]}
          onClick={({ value }) => {
            setTemperature(value)
          }}
          active={({ value }) => value === ac.attributes.temperature}
        />
        <Sections
          items={[
            {
              value: 'Quiet',
              onClick: () => {
                setPresetMode('quiet')
              },
              active: () => ac.state === 'cool' && ac.attributes.preset_mode === 'quiet',
            },
            {
              value: 'Low',
              onClick: () => {
                setPresetMode('off')
                setFanMode('low')
              },
              active: () =>
                ac.state === 'cool' &&
                ac.attributes.preset_mode === 'off' &&
                ac.attributes.fan_mode === 'low',
            },
            {
              value: 'Auto',
              onClick: () => {
                setPresetMode('off')
                setFanMode('auto')
              },
              active: () =>
                ac.state === 'cool' &&
                ac.attributes.preset_mode === 'off' &&
                ac.attributes.fan_mode === 'auto',
            },
            {
              value: 'Turbo',
              onClick: () => {
                setPresetMode('speed')
              },
              active: () => ac.state === 'cool' && ac.attributes.preset_mode === 'speed',
            },
          ]}
          secondClick={turnOff}
        />
      </Stack>
    </Stack>
  )
}
