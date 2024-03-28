import React, { HTMLProps } from 'react'
import styled from '@emotion/styled'

interface Props extends Partial<HTMLProps<HTMLSpanElement>> {
  name: string
  size?: number
  color?: string
  onClick?: () => void
  className: string
  withBackground?: boolean | number
}

const defaultProps: Partial<Props> = {
  className: '',
  size: 22,
  withBackground: false
}

function Icon({
  className,
  name,
  size,
  color,
  withBackground,
  onClick
}: Props): JSX.Element {
  return (
    <Container
      className={`${className} ${name} material-icons`}
      size={size}
      color={color}
      onClick={onClick}
      withBackground={withBackground}
    >
      {name}
    </Container>
  )
}


const Container = styled.span<Partial<Props>>`
  ${({ theme, size, color, withBackground, onClick }) => {
    const { colors } = theme

    let styles: string = `
      font-size: ${size}px;
      color: ${color || colors.FONT.DESCRIPTION};
    `

    if (withBackground) {
      const _SUBTRACTED_SIZE_PERCENTAGE = typeof withBackground === 'number' ? withBackground : 0.35 // -- 35%

      styles += `
        width: ${size}px;
        height: ${size}px;
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${size - (size * _SUBTRACTED_SIZE_PERCENTAGE)}px;
        background-color: ${colors.NEUTRAL.SIDE};
      `
    }

    if (onClick) {
      styles += 'cursor: pointer;'
    }

    return styles
  }}

`

Icon.defaultProps = defaultProps

export default Icon
