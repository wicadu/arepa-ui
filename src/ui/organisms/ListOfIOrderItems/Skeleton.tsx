import React from 'react'
import styled from '@emotion/styled'

import OrderItem from '../OrderItem/OrderItem'

function ListOfIOrderItemsSkeleton() {
  return (
    <ListWrapper>
      <OrderItem.Skeleton />
      <OrderItem.Skeleton />
      <OrderItem.Skeleton />
      <OrderItem.Skeleton />
      <OrderItem.Skeleton />
    </ListWrapper>
  )
}

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export default ListOfIOrderItemsSkeleton
