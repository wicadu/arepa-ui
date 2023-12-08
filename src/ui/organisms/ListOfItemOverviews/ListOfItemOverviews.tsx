import React from 'react'
import styled from '@emotion/styled'

import InfiniteScroll from '../../hocs/InfiniteScroll'
import ItemOverviewAsList from '../ItemOverviewAsList/ItemOverviewAsList'
import Notice from '../../molecules/Notice/Notice'
import ListOfItemOverviewsSkeleton from './ListOfItemOverviews.Skeleton'

type DataExtracted<ItemT> = (info: ItemT) => Partial<ItemT>

interface Props<ItemT> {
  data: Array<ItemT> | null | undefined
  error?: boolean | undefined
  keyExtracted: string
  hasMore?: boolean
  fetchNext?: () => void
  listWrapper: React.ReactElement | any
  itemWrapper: React.ReactElement | any
  dataExtractor?: DataExtracted<ItemT> | null | undefined
  endMessage: React.ReactElement | null
}

const defaultProps: Props<any> = {
  data: [],
  listWrapper: 'div',
  itemWrapper: 'div',
  dataExtractor: null,
  keyExtracted: '',
  endMessage: null
}

function ListOfItemOverviews<ItemT>({
  data,
  hasMore,
  fetchNext,
  itemWrapper: ItemWrapper,
  dataExtractor,
  keyExtracted,
  endMessage,
}: Props<ItemT>) {
  if (data?.length === 0) return <Notice.EmptySearch />

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
            <ItemOverviewAsList {...dataExtractor({ ...item })} />
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

ListOfItemOverviews.defaultProps = defaultProps
ListOfItemOverviews.Skeleton = ListOfItemOverviewsSkeleton

export default ListOfItemOverviews
