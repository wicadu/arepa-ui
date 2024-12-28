import React from 'react'

import styled from '@emotion/styled'
import { css, SerializedStyles } from '@emotion/react'

import Typography from '../../atoms/Typography'
import Column from '../../layout/Column'
import Row from '../../layout/Row'
import Image from '../../atoms/Image'

import OrderItemSkeleton from './Skeleton'
import OrderItemBottom from './OrderItemBottom'
import OrderItemSpecs, { type Price, type Spec } from './OrderItemSpecs'

export interface Props {
  image?: string
  label?: string
  name: string
  time?: string
  description: string
  specs?: Spec[]
  price: Price
  imageLoadingType?: 'eager' | 'lazy'
  fallbackImage?: string
  containerStyles?: SerializedStyles | string
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
  imageComponent?: React.ElementType
  className?: string
}

const defaultProps: Props = {
  image: '',
  name: '',
  time: '',
  description: '',
  specs: [],
  price: {} as Price,
  fallbackImage: '',
  imageLoadingType: 'eager',
  imageComponent: 'img',
  className: '',
}

function OrderItem(props: Props) {
  const {
    specs,
    price,
    name,
    label,
    image,
    time,
    onClick,
    description,
    fallbackImage,
    imageLoadingType,
    containerStyles,
    imageComponent,
    className,
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
      className={className}
    >
      <StyledLabel
        type="helper"
        numberOfLines={1}
        weight={700}
        size={10}
        children={label}
        itemProp="gtin13"
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
            {time ? (
              <Row gap={0} align="space-between">
                <Typography
                  type="title-3"
                  numberOfLines={1}
                  weight={700}
                  size={16}
                  children={name}
                  itemProp="name"
                  styles={cssTitleStyles}
                />

                <Typography type="description" size={12} children={time} />
              </Row>
            ) : (
              <Typography
                type="title-3"
                numberOfLines={1}
                weight={700}
                size={16}
                children={name}
                itemProp="name"
                styles={cssTitleStyles}
              />
            )}

            <Typography
              type="description"
              numberOfLines={2}
              size={12}
              itemProp="description"
              children={description}
              styles={cssDescriptionStyles}
            />
          </Column>

          <OrderItemSpecs specs={specs} price={price} />
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

const StyledLabel = styled(Typography)`
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
    margin: auto;
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
