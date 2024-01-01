import React from 'react'
import styled from '@emotion/styled'

import Icon from '../../atoms/Icon'

interface ImageContentProps {
  image?: string
}

function ImageContent({ image }: ImageContentProps) {
  return (
    <ImageContainer>
      {!image ? (
        <Icon name='image' size={35} />
      ) : (
        <Image src={image} />
      )}
    </ImageContainer>
  )
}

const ImageContainer = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.4rem;
  height: 4.4rem;
  background-color: ${({ theme }) => theme.colors.NEUTRAL.SIDE};
  border-radius: 10px;
  padding: 0.5rem;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export default ImageContent
