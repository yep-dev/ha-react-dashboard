import { css } from '@emotion/react'

type IconProps = {
  name: string
  size?: number
} & React.HTMLAttributes<HTMLImageElement>

const iconStyles = (size: number) => css`
  width: ${size}px;
  height: ${size}px;
`

export const Icon = ({ name, size = 24, ...props }: IconProps) => {
  return (
    <img css={iconStyles(size)} src={`/local/dashboard/icons/${name}.svg`} alt={name} {...props} />
  )
}
