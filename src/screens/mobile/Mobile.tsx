import { MainColumn, Stack } from '@components'
import { Column1, Column2, Column3, TabColumn } from '@screens'
import { useMedia } from 'react-use'

MainColumn.defaultProps = {
  column: true,
  align: 'flex-start',
  gap: 8,
}

export const Mobile = () => {
  const isSmallScreen = useMedia('(max-width: 1258px)')

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
