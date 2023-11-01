import { MainColumn, Stack } from '@components'
import { HassEntityWithApi, useEntity } from '@hakit/core'
import { Column1, Column2, Column3, TabColumn } from '@screens'
import { useEffect } from 'react'
import { useMedia } from 'react-use'

MainColumn.defaultProps = {
  column: true,
  align: 'flex-start',
  gap: 8,
}

export const Mobile = () => {
  const isSmallScreen = useMedia('(max-width: 1258px)')
  const xperiaScreen = useEntity(
    'input_boolean.xperia_screen',
  ) as HassEntityWithApi<'input_boolean'>
  const updateVisibility = () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.get('env') === 'xperia') {
      if (document.visibilityState === 'visible') {
        xperiaScreen.api.turnOn()
      } else {
        xperiaScreen.api.turnOff()
      }
    }
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', updateVisibility)
  }, [])

  setInterval(updateVisibility, 60000)

  return (
    // setup for 1260x540 px (200% scaling of super light – to attach to the arm – xperia 10 V phone)
    <Stack gap={'0 10px'} align="space-around" alignItems="flex-start" wrap="wrap" stretch={false}>
      <Column1 />
      <Column2 />
      {isSmallScreen && <TabColumn />}
      <Column3 />
    </Stack>
  )
}
