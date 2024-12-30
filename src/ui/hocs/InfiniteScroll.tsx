import React from 'react'
import InfiniteScrollComponent from 'react-infinite-scroll-component'
import styled from '@emotion/styled'

import Spin from '../atoms/Spin'

interface Props {
  next: () => void
  dataLength: number
  scrollableTarget?: string
  hasMore: boolean
  children: React.ReactElement[] | React.ReactElement
  endMessage: React.ReactElement | null
  direction?: 'column' | 'row'
}

const defaultProps: Props = {
  next: null,
  dataLength: 0,
  hasMore: false,
  children: null,
  endMessage: null,
  direction: 'column',
}

function InfiniteScroll(props: Props) {
  const {
    next,
    dataLength,
    scrollableTarget,
    hasMore,
    children,
    endMessage,
    direction,
  } = {
    ...defaultProps,
    ...props,
  }

  return (
    <InfiniteScrollComponent
      dataLength={dataLength}
      next={next}
      style={{
        'overflow-y': direction === 'column' ? 'auto' : 'hidden',
      }}
      hasMore={hasMore}
      loader={
        <SpinWrapper>
          <Spin center />
        </SpinWrapper>
      }
      endMessage={endMessage}
      scrollableTarget={scrollableTarget}
    >
      {children}
    </InfiniteScrollComponent>
  )
}

const SpinWrapper = styled.div`
  margin: 15px 0;
`

export default InfiniteScroll
