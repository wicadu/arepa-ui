import React from 'react'
import styled from '@emotion/styled'

interface Props {
  src: string
  alt: string
  backgroundColor?: string
  width?: number | string
  height?: number | string
  rounded?: number
  fit?: 'contain' | 'cover'
  'data-id'?: string | number
  onClick?: React.MouseEventHandler<HTMLImageElement>
  loading?: 'eager' | 'lazy'
  itemProp?: string
}

const defaultProps: Partial<Props> = {
  width: 100,
  height: 100,
  fit: 'cover',
  'data-id': null,
}

const Image = (props: Props) => {
  const {
    src,
    width,
    height,
    alt,
    rounded,
    backgroundColor,
    fit,
    'data-id': dataId,
    onClick,
    loading,
  } = {
    ...defaultProps,
    ...props,
  }

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
      data-id={dataId}
      loading={loading}
    />
  )
}

const _PADDING_PERCENTAGE = 25
const _DEFAULT_RADIUS = 7

const Img = styled.img<Props>`
  ${({ backgroundColor, width, height, rounded, onClick, fit }) => {
    let styles: string = `
      border-radius: ${rounded || _DEFAULT_RADIUS}px;
      width: ${typeof width === 'string' ? width : `${width}px`};
      height: ${typeof height === 'string' ? height : `${height}px`};
      object-fit: ${fit};
    `

    if (backgroundColor?.length >= 1) {
      styles += `
        background-color: ${backgroundColor};
        padding: ${((width as number) * _PADDING_PERCENTAGE) / 100}px;
      `
    }

    if (onClick) {
      styles += 'cursor: pointer;'
    }

    return styles
  }}
`

export default Image
