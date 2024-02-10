import React from 'react'
import styled from '@emotion/styled'

import Typography from '../../atoms/Typography'
import Column from '../../layout/Column'
import Row from '../../layout/Row'

import ItemText from './ItemText'
import ImageContent from './ImageContent'
import ItemSpec from './ItemSpec'
import OrderItemSkeleton from './Skeleton'

type ItemSpec = {
  key?: string
  value?: string | number
}

interface Props {
  image?: string
  label?: string
  name: string
  description: string
  price?: string
  specs?: ItemSpec[]
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

const defaultProps: Props = {
  image: '',
  name: '',
  description: '',
  specs: [],
}

function OrderItem({
  specs,
  name,
  label,
  image,
  price,
  onClick,
  description,
}: Props) {
  return (
    <Column gap={5} onClick={onClick}>
      <ItemText type='label' content={label} numberOfLines={1} />

      <Content>
        <ImageContent image={image} />
        <Column align='space-between' flex={1}>
          <Column>
            <ItemText type='title' content={name} numberOfLines={1} />
            <ItemText type='description' content={description} numberOfLines={2} />
          </Column>

          {price ? (
            <Typography
              type='helper'
              weight={700}
              size={16}
            >
              {price}
            </Typography>
          ) : (
            <Row align='space-between'>
              {specs.map(({ key, value }) => (
                <ItemSpec key={`${key}-${value}`} name={key} value={value} />
              ))}
            </Row>
          )}
        </Column>
      </Content>
    </Column>
  )
}

const Content = styled.div`
  display: flex;
  gap: 5px;
`

OrderItem.defaultProps = defaultProps
OrderItem.Skeleton = OrderItemSkeleton

export default OrderItem
