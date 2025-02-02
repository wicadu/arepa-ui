import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

import InfiniteScroll from '../../hocs/InfiniteScroll'
import FlatListSkeleton from './Skeleton'
import MemoizedWrapper from '../../hocs/MemoizedWrapper'

type DataExtracted<ItemT> = (info: ItemT, index: number) => Partial<ItemT>

interface Props<ItemT> {
  data: Array<ItemT> | null | undefined
  error?: boolean | undefined
  keyExtracted: string
  hasMore?: boolean
  fetchNext?: () => void
  wrapperTag?: keyof JSX.IntrinsicElements
  component: React.ReactElement
  itemWrapperTag?: keyof JSX.IntrinsicElements
  listWrapperProps?: Record<string, unknown>
  itemWrapperProps?: Record<string, unknown>
  dataExtractor: DataExtracted<ItemT> | null | undefined
  endMessage: React.ReactElement | null
  styles: string | SerializedStyles
  direction?: 'column' | 'row'
  className?: string
}

const defaultProps: Partial<Props<any>> = {
  data: [],
  error: false,
  hasMore: false,
  wrapperTag: 'ul',
  itemWrapperTag: 'li',
  itemWrapperProps: {},
  listWrapperProps: {},
  endMessage: null,
  keyExtracted: 'id',
  direction: 'column',
  className: '',
  fetchNext() {},
  dataExtractor(item) {
    return item
  },
}

function FlatList<ItemT>(props: Props<ItemT>) {
  const {
    data,
    hasMore,
    fetchNext,
    component: Component,
    wrapperTag,
    listWrapperProps,
    itemWrapperTag,
    itemWrapperProps,
    dataExtractor,
    keyExtracted,
    endMessage,
    direction,
    styles,
    className,
  } = {
    ...defaultProps,
    ...props,
  }

  const ListWrapper = useMemo(
    () => Container.withComponent(wrapperTag!),
    [wrapperTag]
  )

  const ItemWrapper = useMemo(
    () => Item.withComponent(itemWrapperTag!),
    [itemWrapperTag]
  )

  return (
    <InfiniteScroll
      dataLength={data?.length}
      hasMore={hasMore}
      direction={direction}
      next={fetchNext}
      endMessage={endMessage}
      className={className}
    >
      <ListWrapper styles={styles} direction={direction} {...listWrapperProps}>
        {data?.map((item, index) => (
          <ItemWrapper
            key={keyExtracted === 'index' ? index : item?.[keyExtracted]}
            index={index}
            value={String(item?.[keyExtracted])}
            name={String(item?.[keyExtracted])}
            {...itemWrapperProps}
          >
            <MemoizedWrapper>
              {React.isValidElement(Component) ? (
                React.cloneElement(
                  Component,
                  dataExtractor?.({ ...item }, index),
                  index
                )
              ) : (
                <Component
                  {...dataExtractor?.({ ...item }, index)}
                  index={index}
                />
              )}

              <meta itemProp="position" content={index} />
            </MemoizedWrapper>
          </ItemWrapper>
        ))}
      </ListWrapper>
    </InfiniteScroll>
  )
}

export const Container = styled.div<Partial<Props<unknown>>>`
  display: flex;
  gap: 15px;
  flex-direction: ${({ direction }) => direction};

  ${({ styles }) => styles}
`

export const Item = styled.div<Partial<Props<unknown>>>`
  width: 100%;

  meta {
    display: none;
  }
`

FlatList.Skeleton = FlatListSkeleton

export default FlatList
