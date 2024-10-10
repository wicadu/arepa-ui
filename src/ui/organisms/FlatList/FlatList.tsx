import React from 'react'
import styled from '@emotion/styled'

import InfiniteScroll from '../../hocs/InfiniteScroll'
import FlatListSkeleton from './Skeleton'
import { SerializedStyles } from '@emotion/react'

type DataExtracted<ItemT> = (info: ItemT, index: number) => Partial<ItemT>

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
  styles: string | SerializedStyles
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

function FlatList<ItemT>(props: Props<ItemT>) {
  const {
    data,
    hasMore,
    fetchNext,
    component: Component,
    itemWrapper: ItemWrapper,
    dataExtractor,
    keyExtracted,
    endMessage,
    styles
  } = {
    ...defaultProps,
    ...props
  }

  return (
    <InfiniteScroll
      dataLength={data?.length}
      hasMore={hasMore}
      next={fetchNext}
      endMessage={endMessage}
    >
      <ListWrapper styles={styles}>
        {data?.map((item, index) => (
          <ItemWrapper
            key={item?.[keyExtracted]}
            index={index}
            value={String(item?.[keyExtracted])}
            name={String(item?.[keyExtracted])}
          >
            {React.isValidElement(Component)
              ? React.cloneElement(Component, dataExtractor({ ...item }, index))
              : <Component {...dataExtractor({ ...item }, index)} />
            }
          </ItemWrapper>
        ))}
      </ListWrapper>
    </InfiniteScroll>
  )
}

export const ListWrapper = styled.ul<Partial<Props<unknown>>>`
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${({ styles }) => styles}
`

FlatList.Skeleton = FlatListSkeleton

export default FlatList
