import React from 'react'
import styled from '@emotion/styled'

interface Props extends Partial<React.ImgHTMLAttributes<HTMLImageElement>> {
  backgroundColor?: string
  width?: number
  height?: number
  rounded?: boolean
  fit: 'contain' | 'cover'
}

const defaultProps = {
  width: 100,
  height: 100,
  fit: 'cover'
}

const Image = ({
  src,
  width,
  height,
  alt,
  rounded,
  backgroundColor,
  fit,
  onClick,
}: Props) => {
  return (
    <Img
      src={src}
      alt={alt}
      width={width}
      rounded={rounded}
      height={height}
      fit={fit}
      onClick={onClick}
      backgroundColor={backgroundColor}
    />
  )
}

const _PADDING_PERCENTAGE = 25
const _DEFAULT_RADIUS = 7

const Img = styled.img<Props>`
  ${({ backgroundColor, width, height, rounded, onClick, fit }) => {
    let styles: string = `
      border-radius: ${rounded ? (width + height) / 2 : _DEFAULT_RADIUS}px;
      width: ${width}px;
      height: ${height}px;
      object-fit: ${fit};
    `

    if (backgroundColor?.length >= 1) {
      styles += `
        background-color: ${backgroundColor};
        padding: ${(width * _PADDING_PERCENTAGE) / 100}px;
      `
    }

    if (onClick) {
      styles += 'cursor: pointer;'
    }

    return styles
  }}
`

Image.defaultProps = defaultProps

export default Image
