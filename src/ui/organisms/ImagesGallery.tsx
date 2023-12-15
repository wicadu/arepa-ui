import React, { useState, useMemo } from 'react'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import Icon from '../atoms/Icon'
import Image from '../atoms/Image'

type Image = {
  value: string
  id: number
}

type Props = {
  images: Image[]
  icons: string[]
  isItOnOverlay?: boolean
  onClickMainImage?: (event?: React.MouseEvent<HTMLElement>) => void
  onChangeImage?: (data: Image) => void
  onPressIcon?: (event?: React.MouseEvent<HTMLElement>) => void
}

function ImagesGallery({
  images,
  icons,
  isItOnOverlay,
  onClickMainImage,
  onChangeImage,
  onPressIcon,
}: Props) {
  const [currentImage, setCurrentImage] = useState<string>(images?.[0]?.value)

  const { colors } = useTheme()

  const thereAreNoImages = useMemo(() => images?.length === 0, [images])
  const color = useMemo(
    () => (isItOnOverlay ? colors.NEUTRAL.BACKGROUND : colors.FONT.DESCRIPTION),
    [isItOnOverlay, colors]
  )

  const _handleChangeImage = ({ target }) => {
    const imageSrc: string = target.getAttribute('src')

    setCurrentImage(imageSrc)

    if (onChangeImage) {
      const chosenImage: Image = images?.find(({ value }) => value === imageSrc)

      onChangeImage(chosenImage)
    }
  }

  if (thereAreNoImages) {
    return (
      <NoImageContainer>
        <Icon name="image" size={30} color={color} />
      </NoImageContainer>
    )
  }

  return (
    <Wrapper>
      <Image
        src={currentImage}
        width={175}
        height={175}
        onClick={onClickMainImage}
      />

      <Carousel>
        {images?.map(({ value, id }: Image) => (
          <Image
            width={30}
            height={30}
            src={value}
            key={id}
            onClick={_handleChangeImage}
            backgroundColor={
              currentImage === value
                ? colors.NEUTRAL.SELECTED
                : colors.NEUTRAL.TRANSPARENT
            }
          />
        ))}
        {icons?.map((value: string) => (
          <Icon
            key={value}
            name={value}
            size={24}
            color={color}
            onClick={onPressIcon}
          />
        ))}
      </Carousel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;
`

const NoImageContainer = styled.div`
  width: 100%;
  height: 175px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
`

const Carousel = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export default ImagesGallery
