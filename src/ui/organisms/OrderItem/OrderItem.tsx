import React, { useState } from 'react'

import styled from '@emotion/styled'
import { css, SerializedStyles } from '@emotion/react'

import Typography from '../../atoms/Typography'
import Column from '../../layout/Column'
import Row from '../../layout/Row'
import Icon from '../../atoms/Icon'
import Image from '../../atoms/Image'

import OrderItemSkeleton from './Skeleton'
import OrderItemBottom from './OrderItemBottom'

type Spec = {
  key?: string
  value?: string | number
}

interface Props {
  image?: string
  label?: string
  name: string
  description: string
  customSpecComponent?: React.ReactElement
  specs?: Spec[]
  imageLoadingType?: 'eager' | 'lazy'
  fallbackImage?: string
  containerStyles?: SerializedStyles | string
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
  imageComponent?: React.ElementType
}

const defaultProps: Props = {
  image: '',
  name: '',
  description: '',
  specs: [],
  fallbackImage: '',
  imageLoadingType: 'eager',
  imageComponent: 'img',
}

function OrderItem(props: Props) {
  const {
    specs,
    name,
    label,
    image,
    customSpecComponent,
    onClick,
    description,
    fallbackImage,
    imageLoadingType,
    containerStyles,
    imageComponent,
  } = {
    ...defaultProps,
    ...props,
  }

  return (
    <Column
      gap={5}
      onClick={onClick}
      styles={cssContainerStyles(containerStyles)}
      itemProp="item"
      itemScope
      itemType="https://schema.org/Product"
    >
      <Typography
        type="helper"
        numberOfLines={1}
        weight={700}
        size={10}
        children={label}
        itemProp="gtin13"
        styles={cssLabelStyles}
      />

      <Content>
        <ImageContainer itemProp="image" content={image}>
          <Image
            src={image}
            fit="cover"
            loading={imageLoadingType}
            width="100%"
            height="100%"
            fallback={fallbackImage}
            imageComponent={imageComponent}
            alt={name}
          />
        </ImageContainer>

        <Column align="space-between" gap={0} flex={1}>
          <Column gap={0}>
            <Typography
              type="title-3"
              numberOfLines={1}
              weight={700}
              size={16}
              children={name}
              itemProp="name"
              styles={cssTitleStyles}
            />
            <Typography
              type="description"
              numberOfLines={2}
              size={12}
              itemProp="description"
              children={description}
              styles={cssDescriptionStyles}
            />
          </Column>

          {customSpecComponent ? (
            React.cloneElement(customSpecComponent)
          ) : (
            <Row gap={0} align="space-between">
              {specs?.map(({ key, value }) => (
                <Typography
                  key={`${key}-${value}`}
                  type="description"
                  children={value}
                  weight={700}
                  size={14}
                  styles={cssSpecsStyles}
                  afterStyles={{
                    content: ` ${key ?? ''}`,
                    size: 10,
                    weight: 300,
                  }}
                />
              ))}
            </Row>
          )}
        </Column>
      </Content>
    </Column>
  )
}

const cssContainerStyles = (extraStyles?: SerializedStyles | string) => css`
  cursor: pointer;
  ${extraStyles}
`

const Content = styled.div`
  display: flex;
  gap: 5px;
`

const cssLabelStyles = css`
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`

const cssTitleStyles = css`
  @media screen and (min-width: 768px) {
    font-size: 22px;
  }
`

const cssDescriptionStyles = css`
  @media screen and (min-width: 768px) {
    font-size: 18px;
    -webkit-line-clamp: 1;
    line-height: normal;
  }
`

const cssSpecsStyles = css`
  @media screen and (min-width: 768px) {
    font-size: 18px;
    line-height: 22px;

    &::after {
      font-size: 16px;
    }
  }
`

const ImageContainer = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.NEUTRAL.SIDE};
  border-radius: 10px;

  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  img[data-image-is-fallback='true'] {
    width: 40px;
    height: 40px;
  }

  @media screen and (min-width: 768px) {
    width: 80px;
    height: 80px;

    img[data-image-is-fallback='true'] {
      width: 50px;
      height: 50px;
    }
  }
`

OrderItem.OrderItemBottom = OrderItemBottom
OrderItem.Skeleton = OrderItemSkeleton

export default OrderItem
