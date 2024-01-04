import { Stack } from '@components'
import { useEntity } from '@hakit/core'
import { Column1, Column2, Column3, TabColumn } from '@mobile'
import { DmnModal, EntertainmentModal, EstimateModal, ProjectModal, SleepModal } from '@modals'
import { useEffect } from 'react'
import { useMedia } from 'react-use'

export const Mobile = () => {
  const isSmallScreen = useMedia('(max-width: 1258px)')
  const xperiaScreen = useEntity('input_boolean.xperia_screen')
  const updateVisibility = () => {
    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.get('env') === 'mobile') {
      if (document.visibilityState === 'visible') {
        xperiaScreen.service.turnOn()
      } else {
        xperiaScreen.service.turnOff()
      }
    }
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', updateVisibility)
    setInterval(updateVisibility, 60000)
  }, [])

  return (
    // setup for 1260x540 px (200% scaling of super light – to attach to the arm – xperia 10 V phone)
    <Stack gap={'0 10px'} align="space-around" alignItems="flex-start" wrap="wrap" stretch={false}>
      <Column1 />
      <Column2 />
      {isSmallScreen && <TabColumn />}
      <Column3 />
      <ProjectModal />
      <EntertainmentModal />
      <EstimateModal />
      <SleepModal />
      <DmnModal />
    </Stack>
  )
}
