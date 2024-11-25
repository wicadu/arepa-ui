import React from 'react'

import styled from '@emotion/styled'

import { useDataset } from '../../hooks'

interface Props {
  src?: string
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
  datasets: {
    [key: string]: string | number
  }
  imageComponent: React.ElementType
}

const defaultProps: Partial<Props> = {
  width: 100,
  height: 100,
  fit: 'cover',
  'data-id': null,
  imageComponent: 'img',
}

const Image = (props: Props) => {
  const {
    src,
    alt,
    width,
    height,
    rounded,
    backgroundColor,
    fit,
    onClick,
    loading,
    datasets,
    itemProp,
    imageComponent,
    ...restOfProps
  } = {
    ...defaultProps,
    ...props,
  }

  const dataAttributes = useDataset(datasets)

  const _PADDING_PERCENTAGE = 25
  const _DEFAULT_RADIUS = 7

  const StyledImage = styled(imageComponent)<Props>`
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

  return (
    <StyledImage
      src={src}
      alt={alt}
      width={width}
      rounded={rounded}
      height={height}
      fit={fit}
      onClick={onClick}
      backgroundColor={backgroundColor}
      loading={loading}
      itemProp={itemProp}
      {...restOfProps}
      {...dataAttributes}
    />
  )
}

export default Image
