import React from 'react'
import styled from '@emotion/styled'

import ItemOverviewAsList from '../ItemOverviewAsList/ItemOverviewAsList'

function ListOfIOrderItemsSkeleton() {
  return (
    <ListWrapper>
      <ItemOverviewAsList.Skeleton />
      <ItemOverviewAsList.Skeleton />
      <ItemOverviewAsList.Skeleton />
      <ItemOverviewAsList.Skeleton />
      <ItemOverviewAsList.Skeleton />
    </ListWrapper>
  )
}

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export default ListOfIOrderItemsSkeleton
