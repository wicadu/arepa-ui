import React, { useCallback, useMemo } from 'react'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Size } from 'react-easy-crop'

import Image from '../../atoms/Image'
import Icon from '../../atoms/Icon'
import Spin from '../../atoms/Spin'
import Button from '../../atoms/Button'
import Typography from '../../atoms/Typography'
import Column from '../../layout/Column'
import { UIElementSizesEnum, UIElementShapeEnum } from '../../ts'

interface Props {
  size: Size
  shape: UIElementShapeEnum
  image: string
  loading: boolean
  buttonText: string
  helperTexts: string[],
  onDelete: () => void
  onLoad: () => void
}

const defaultProps: Partial<Props> = {
  image: '',
  loading: false,
  helperTexts: [],
  buttonText: '',
  onDelete() { },
  onLoad() { }
}

function ImageDisplay(props: Props) {
  const {
    image,
    size,
    onDelete,
    onLoad,
    loading,
    buttonText,
    helperTexts,
    shape,
  } = {
    ...defaultProps,
    ...props,
  }

  const helpersStyles = useMemo(() => cssHelpersStyles(size), [
    size
  ])

  const handleOnDelete = useCallback(() => {
    if (loading) return
    onDelete?.()
  }, [
    loading,
    onDelete,
  ])

  return (
    <Container>
      <ContainerImage>
        <DeleteIconContainer onClick={handleOnDelete}>
          {loading ?
            <Spin size={10} type='white' /> :
            <Icon name='delete_forever' size={10} color='white' />
          }
        </DeleteIconContainer>

        <Image
          src={image}
          width={size?.width}
          height={size?.height}
          fit='cover'
          rounded={shape === UIElementShapeEnum.Rect ? 10 : size.width}
        />
      </ContainerImage>

      <Column gap={25} styles={helpersStyles}>
        <Button
          type='white'
          outlined
          width={`${size.width}px`}
          size={UIElementSizesEnum.Medium}
          onClick={onLoad}
          disabled={loading}
          children={buttonText}
        />

        <Column gap={10}>
          {helperTexts?.map((helperText: string, index: number) =>
            <Typography
              key={index}
              type='helper'
              color='white'
              align='center'
              children={helperText}
            />
          )}
        </Column>
      </Column>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContainerImage = styled.figure`
  position: relative;
  margin-bottom: 50px;
`

const DeleteIconContainer = styled.div`
  width: 23px;
  height: 23px;
  ${({ theme }) => `background-color: ${theme.colors.MAIN.ERROR};`}
  border-radius: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
`

const cssHelpersStyles = (size: Size) => css`
  max-width: ${size?.width}px;
`

export default ImageDisplay
