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
  isItOnOverlay?: boolean
  mainImageWidth?: number | string
  mainImageHeight?: number | string
  slideImageSize?: number
  containerStyles?: SerializedStyles | string
  onExpandImage?: (event?: React.MouseEvent<HTMLElement>) => void
  onChangeImage?: (data: Image) => void
}

const defaultProps: Partial<Props> = {
  images: [],
  isItOnOverlay: false,
  slideImageSize: 30,
  containerStyles: '',
  onExpandImage() {},
  onChangeImage() {},
}

function ImagesGallery({
  images,
  defaultImage,
  mainImageWidth,
  mainImageHeight,
  slideImageSize,
  isItOnOverlay,
  containerStyles,
  onExpandImage,
  onChangeImage,
}: Props) {
  const [currentImage, setCurrentImage] = useState<Image>()

  const { colors } = useTheme()

  const color = useMemo(
    () => (isItOnOverlay ? colors.NEUTRAL.BACKGROUND : colors.FONT.DESCRIPTION),
    [isItOnOverlay, colors]
  )

  const onChange = useCallback((image: Image) => {
    setCurrentImage(image)
    onChangeImage?.(image)
  }, [onChangeImage])

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
    <Column gap={15} align='center' styles={containerStyles}>
      <Image
        src={currentImage?.value}
        width={mainImageWidth}
        height={mainImageHeight}
        onClick={onExpandImage}
        fit='contain'
        data-id={currentImage?.id}
      />

      <Carousel>
        {images?.map(({ value, id }: Image) => (
          <Image
            width={slideImageSize}
            height={slideImageSize}
            src={value}
            key={id}
            fit='contain'
            onClick={() => onChange({ value, id })}
            backgroundColor={
              currentImage?.value === value
                ? colors.NEUTRAL.SELECTED
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
  height: ${({ height }) => typeof height ==='number' ? `${height}px`: height};
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
`

const Carousel = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`

ImagesGallery.defaultProps = defaultProps

export default ImagesGallery
