import React from 'react'
import styled from '@emotion/styled'

import Icon from '../../atoms/Icon'
import Image from '../../atoms/Image'

interface ImageContentProps {
  image?: string
}

function ImageContent({ image }: ImageContentProps) {
  return (
    <ImageContainer>
      {!image ? (
        <Icon name='image' size={70} withBackground={0.5} />
      ) : (
        <Image src={image} width={70} height={70} />
      )}
    </ImageContainer>
  )
}

const ImageContainer = styled.figure`
  width: 70px;
  height: 70px;
`

export default ImageContent
