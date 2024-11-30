import React, { useState, useEffect } from 'react'

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
  loading?: 'eager' | 'lazy'
  itemProp?: string
  datasets?: {
    [key: string]: string | number
  }
  fallback?: string
  imageComponent?: React.ElementType
  onClick?: React.MouseEventHandler<HTMLImageElement>
  onError?: React.ReactEventHandler<HTMLImageElement>
}

const defaultProps: Partial<Props> = {
  width: 100,
  height: 100,
  datasets: {},
  fit: 'cover',
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
    loading,
    datasets,
    itemProp,
    imageComponent,
    fallback,
    onClick,
    onError,
    ...restOfProps
  } = {
    ...defaultProps,
    ...props,
  }

  const [imageUrl, setImageUrl] = useState<string>(src)
  const dataAttributes = useDataset(datasets)

  const onHandlerError = (e) => {
    if (fallback) setImageUrl(fallback)
    onError?.(e)
  }

  useEffect(() => {
    if (src) setImageUrl(src)
  }, [src])

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
      src={imageUrl}
      alt={alt}
      data-image-is-fallback={imageUrl === fallback}
      width={width}
      rounded={rounded}
      height={height}
      fit={fit}
      onClick={onClick}
      backgroundColor={backgroundColor}
      loading={loading}
      itemProp={itemProp}
      fallback={fallback}
      onError={onHandlerError}
      {...restOfProps}
      {...dataAttributes}
    />
  )
}

export default Image
