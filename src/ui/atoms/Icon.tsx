import React, { HTMLProps } from 'react'
import styled from '@emotion/styled'

interface Props extends Partial<HTMLProps<HTMLSpanElement>> {
  name: string,
  size?: number,
  color?: string,
  onClick?: () => void
  className: string,
}

const defaultProps: Partial<Props> = {
  className: '',
  size: 22,
}

function Icon({ className, name, size, color, onClick }: Props) {
  return (
    <Container
      className={`${className} ${name} material-icons`}
      size={size}
      color={color}
      onClick={onClick}
    >
      {name}
    </Container>
  )
}

const Container = styled.span<Partial<Props>>`
  ${({ theme, size, color }) => `
    font-size: ${size}px;
    color: ${color || theme.colors.FONT.DESCRIPTION}
  `}
`

Icon.defaultProps = defaultProps

export default Icon
