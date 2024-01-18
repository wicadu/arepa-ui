import React from 'react'
import styled from '@emotion/styled'

type ImageProps = {
  backgroundColor?: string
  width?: number
  height?: number
  rounded?: boolean
}

const defaultProps = {
  width: 100,
  height: 100,
}

const Image = ({
  src,
  width,
  height,
  alt,
  rounded,
  backgroundColor,
  onClick,
}: ImageProps & React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <Img
      src={src}
      alt={alt}
      width={width}
      rounded={rounded}
      height={height}
      onClick={onClick}
      backgroundColor={backgroundColor}
    />
  )
}

const _PADDING_PERCENTAGE = 25
const _DEFAULT_RADIUS = 7

const Img = styled.img<ImageProps & React.ImgHTMLAttributes<HTMLImageElement>>`
  ${({ backgroundColor, width, height, rounded, onClick }) => {
    let styles: string = `
      border-radius: ${rounded ? (width + height) / 2 : _DEFAULT_RADIUS}px;
      width: ${width}px;
      height: ${height}px;
      object-fit: cover;
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
