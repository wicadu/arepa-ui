import React from 'react'
import styled from '@emotion/styled'

type ImageProps = {
  backgroundColor?: string
  width?: number
  height?: number
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
  onClick,
  backgroundColor,
}: ImageProps & React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <Img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onClick={onClick}
      backgroundColor={backgroundColor}
    />
  )
}

const PADDING_PERCENTAGE = 25

const Img = styled.img<ImageProps & React.ImgHTMLAttributes<HTMLImageElement>>`
  ${({ backgroundColor, width, height, onClick }) => {
    let styles: string = `
      border-radius: 7px;
      width: ${width}px;
      height: ${height}px;
      object-fit: cover;
    `

    if (backgroundColor?.length >= 1) {
      styles += `
        background-color: ${backgroundColor};
        padding: ${(width * PADDING_PERCENTAGE) / 100}px;
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
