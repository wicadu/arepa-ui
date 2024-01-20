import React from 'react'
import styled from '@emotion/styled'

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
  quantity?: ItemSpec
  spec?: ItemSpec
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

const defaultProps: Props = {
  image: '',
  name: '',
  description: '',
  quantity: {},
  spec: {},
}

function OrderItem(props: Props) {
  const { label, image, name, description, quantity, spec, onClick } = props

  return (
    <Container onClick={onClick}>
      <ItemText type="label" content={label} numberOfLines={1} />
      <Content>
        <ImageContent image={image} />
        <ItemContent>
          <ItemText type="title" content={name} numberOfLines={1} />
          <ItemText type="description" content={description} numberOfLines={2} />

          <SpecsWrapper>
            <ItemSpec name={spec?.key} value={spec?.value} />
            <ItemSpec name={quantity?.key} value={quantity?.value} />
          </SpecsWrapper>
        </ItemContent>
      </Content>
    </Container>
  )
}

const Container = styled.article`
  flex-direction: column;
  display: flex;
  gap: 5px;
`

const Content = styled.div`
  display: flex;
  gap: 5px;
`

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const SpecsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: end;
`

OrderItem.defaultProps = defaultProps
OrderItem.Skeleton = OrderItemSkeleton

export default OrderItem
