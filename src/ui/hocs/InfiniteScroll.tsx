import React from 'react'

import InfiniteScrollComponent from 'react-infinite-scroll-component'
import styled from '@emotion/styled'

import { hexToRGBA } from '../../utils'
import Spin from '../atoms/Spin'

interface Props {
  next: () => void
  dataLength: number
  scrollableTarget?: string
  hasMore: boolean
  children: React.ReactElement[] | React.ReactElement
  endMessage: React.ReactElement | null
  direction?: 'column' | 'row'
  className?: string
}

const defaultProps: Props = {
  next: null,
  dataLength: 0,
  hasMore: false,
  children: null,
  endMessage: null,
  direction: 'column',
  className: '',
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
    className,
  } = {
    ...defaultProps,
    ...props,
  }

  return (
    <StyledInfiniteScroll
      dataLength={dataLength}
      next={next}
      direction={direction}
      hasMore={hasMore}
      loader={
        <SpinWrapper>
          <Spin center />
        </SpinWrapper>
      }
      endMessage={endMessage}
      scrollableTarget={scrollableTarget}
      className={className}
    >
      {children}
    </StyledInfiniteScroll>
  )
}

const StyledInfiniteScroll = styled(InfiniteScrollComponent)`
  ${({ direction, theme }) => {
    let styles = `
      overflow-y: auto;
    `

    if (direction === 'row') {
      styles += `
        overflow-y: hidden;
        
        &::-webkit-scrollbar {
          height: 5px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb {
          background:${hexToRGBA(theme.colors?.FONT?.TITLE, 0.2)};
          border-radius: 5px;
        }
      `
    }

    return styles
  }}
`
const SpinWrapper = styled.div`
  margin: 15px 0;
`

export default InfiniteScroll
