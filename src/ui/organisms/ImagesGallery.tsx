import React, { useState, useMemo, useEffect, useCallback } from 'react'

import styled from '@emotion/styled'
import { SerializedStyles, useTheme } from '@emotion/react'

import Icon from '../atoms/Icon'
import Image from '../atoms/Image'
import Column from '../layout/Column'

type Image = {
  value: string
  id: number
}

type Props = {
  images: Image[]
  defaultImage: Image
  alt: string
  fit?: 'contain' | 'cover'
  fallbackImage?: string
  isItOnOverlay?: boolean
  mainImageWidth?: number | string
  mainImageHeight?: number | string
  slideImageSize?: number
  containerStyles?: SerializedStyles | string
  className?: string
  onExpandImage?: (event?: React.MouseEvent<HTMLElement>) => void
  onChangeImage?: (data: Image) => void
}

const defaultProps: Partial<Props> = {
  images: [],
  isItOnOverlay: false,
  fit: 'contain',
  alt: '',
  fallbackImage: '',
  slideImageSize: 30,
  containerStyles: '',
  className: '',
  onExpandImage() {},
  onChangeImage() {},
}

function ImagesGallery(props: Props) {
  const {
    alt,
    fit,
    images,
    defaultImage,
    fallbackImage,
    mainImageWidth,
    mainImageHeight,
    slideImageSize,
    isItOnOverlay,
    containerStyles,
    className,
    onExpandImage,
    onChangeImage,
  } = {
    ...defaultProps,
    ...props,
  }

  const [currentImage, setCurrentImage] = useState<Image>()

  const { colors } = useTheme()

  const color = useMemo(
    () => (isItOnOverlay ? colors.NEUTRAL.BACKGROUND : colors.FONT.DESCRIPTION),
    [isItOnOverlay, colors]
  )

  const onChange = useCallback(
    (image: Image) => {
      setCurrentImage(image)
      onChangeImage?.(image)
    },
    [onChangeImage]
  )

  useEffect(() => {
    setCurrentImage(defaultImage)
  }, [defaultImage])

  if (!Boolean(images?.length)) {
    return (
      <NoImageContainer onClick={onExpandImage} height={mainImageHeight}>
        <Icon name="insert_photo" size={40} color={color} />
      </NoImageContainer>
    )
  }

  return (
    <Column
      gap={15}
      align="center"
      styles={containerStyles}
      className={className}
    >
      <MainImageFigure
        mainImageHeight={mainImageHeight}
        mainImageWidth={mainImageWidth}
        data-main-image="true"
      >
        <Image
          src={currentImage?.value}
          alt={alt}
          width="100%"
          height="100%"
          fallback={fallbackImage}
          onClick={onExpandImage}
          fit={fit}
          datasets={{
            id: currentImage?.id,
          }}
        />
      </MainImageFigure>

      <Carousel data-image-carousel="true">
        {images?.map(({ value, id }: Image) => (
          <Image
            width={slideImageSize}
            height={slideImageSize}
            fallback={fallbackImage}
            src={value}
            alt={`${alt} - ${id}`}
            key={id}
            fit="contain"
            onClick={() => onChange({ value, id })}
            backgroundColor={
              currentImage?.value === value
                ? colors.NEUTRAL.SIDE
                : colors.NEUTRAL.TRANSPARENT
            }
          />
        ))}
      </Carousel>
    </Column>
  )
}

const NoImageContainer = styled.div<{ height: number | string }>`
  width: 100%;
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
`

const MainImageFigure = styled.figure<Partial<Props>>`
  border-radius: 10px;
  overflow: hidden;
  ${({ mainImageHeight, mainImageWidth }) => `
    width: ${mainImageWidth};
    height: ${mainImageHeight};
  `}
`

const Carousel = styled.figure`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`

export default ImagesGallery
