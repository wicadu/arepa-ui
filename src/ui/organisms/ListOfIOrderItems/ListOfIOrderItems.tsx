import React from 'react'
import styled from '@emotion/styled'

import InfiniteScroll from '../../hocs/InfiniteScroll'
import ListOfIOrderItemsSkeleton from './Skeleton'

type DataExtracted<ItemT> = (info: ItemT) => Partial<ItemT>

interface Props<ItemT> {
  data: Array<ItemT> | null | undefined
  error?: boolean | undefined
  keyExtracted: string
  hasMore?: boolean
  fetchNext?: () => void
  component: React.ReactElement
  itemWrapper: React.ReactElement | any
  dataExtractor: DataExtracted<ItemT> | null | undefined
  endMessage: React.ReactElement | null
}

const defaultProps: Partial<Props<any>> = {
  data: [],
  error: false,
  hasMore: false,
  fetchNext() { },
  dataExtractor: null,
  itemWrapper: 'div',
  endMessage: null,
  keyExtracted: '',
}

function ListOfIOrderItems<ItemT>({
  data,
  hasMore,
  fetchNext,
  component,
  itemWrapper: ItemWrapper,
  dataExtractor,
  keyExtracted,
  endMessage,
}: Props<ItemT>) {
  return (
    <InfiniteScroll
      dataLength={data?.length}
      hasMore={hasMore}
      next={fetchNext}
      endMessage={endMessage}
    >
      <ListWrapper>
        {data?.map((item, index) => (
          <ItemWrapper
            key={item?.[keyExtracted]}
            index={index}
            value={String(item?.[keyExtracted])}
            name={String(item?.[keyExtracted])}
          >
            {React.cloneElement(component, dataExtractor({ ...item }))}
          </ItemWrapper>
        ))}
      </ListWrapper>
    </InfiniteScroll>
  )
}

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

ListOfIOrderItems.defaultProps = defaultProps
ListOfIOrderItems.Skeleton = ListOfIOrderItemsSkeleton

export default ListOfIOrderItems
