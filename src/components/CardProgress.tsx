import { Card, CardProps } from '@components'
import { colors } from '@constants'
import styled from '@emotion/styled'

type CardProgressProps = {
  progress?: number
} & CardProps

const ProgressBar = styled.div<{ progress: number; color: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: ${({ color }) => color};
  width: ${({ progress }) => `${progress * 100}%`};
  z-index: -1;
  transition: width 1s ease;
`

export const CardProgress = ({ progress, children, ...props }: CardProgressProps) => {
  return (
    <Card {...props}>
      {!!progress && progress < 1 && <ProgressBar progress={progress} color={colors.light} />}
      {children}
    </Card>
  )
}
