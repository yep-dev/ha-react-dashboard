import { Card, Stack } from '@components'
import { useEntity } from '@hooks'

export const Light = () => {
  const hue_office = useEntity('light.hue_office')
  const hue_office_sleep = useEntity('switch.adaptive_lighting_sleep_mode_office')
  const hue_office_adaptive = useEntity('switch.adaptive_lighting_office')

  const off = () => {
    hue_office.service.turnOff()
  }

  const dim = () => {
    hue_office_adaptive.service.turnOn()
    hue_office_sleep.service.turnOn()
    hue_office.service.turnOn()
  }

  const auto = () => {
    hue_office_adaptive.service.turnOn()
    hue_office_sleep.service.turnOff()
    hue_office.service.turnOn()
  }

  const bright = () => {
    hue_office_adaptive.service.turnOff()
    hue_office.service.turnOn({ brightness_pct: 100, kelvin: 4000, transition: 1 })
  }

  const on = hue_office.bool

  return (
    <Stack radius>
      <Card width="1/3">Office</Card>
      <Card onClick={off} active={!on}>
        Off
      </Card>
      <Card onClick={dim} active={on && hue_office_adaptive.bool && hue_office_sleep.bool}>
        Dim
      </Card>
      <Card onClick={auto} active={on && hue_office_adaptive.bool && !hue_office_sleep.bool}>
        Auto
      </Card>
      <Card onClick={bright} active={on && !hue_office_adaptive.bool}>
        Bright
      </Card>
    </Stack>
  )
}
