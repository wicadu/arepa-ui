import React from 'react'
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
  containerStyles?: SerializedStyles | string
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

const defaultProps: Props = {
  image: '',
  name: '',
  description: '',
  specs: [],
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
    containerStyles
  } = {
    ...defaultProps,
    ...props
  }

  return (
    <Column gap={5} onClick={onClick} styles={cssContainerStyles(containerStyles)}>
      <Typography
        type='helper'
        numberOfLines={1}
        weight={700}
        size={10}
        children={label}
        styles={cssLabelStyles}
      />

      <Content>
        <ImageContainer>
          {!image
            ? <Icon name='image' size={35} />
            : <Image src={image} fit='cover' width={68} height={68} />
          }
        </ImageContainer>

        <Column align='space-between' flex={1}>
          <Column>
            <Typography
              type='title-4'
              numberOfLines={1}
              weight={700}
              size={16}
              children={name}
              styles={cssTitleStyles}
            />
            <Typography
              type='description'
              numberOfLines={2}
              size={12}
              children={description}
              styles={cssDescriptionStyles}
            />
          </Column>

          {customSpecComponent
            ? React.cloneElement(customSpecComponent)
            : (
              <Row align='space-between'>
                {specs?.map(({ key, value }) => (
                  <Typography
                    key={`${key}-${value}`}
                    type='description'
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

  @media screen and (min-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

OrderItem.defaultProps = defaultProps

OrderItem.OrderItemBottom = OrderItemBottom
OrderItem.Skeleton = OrderItemSkeleton

export default OrderItem
