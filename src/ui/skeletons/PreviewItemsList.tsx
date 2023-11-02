import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Skeleton from 'react-loading-skeleton'

import Box from '../atoms/Box'

function PreviewItemsListSkeleton({ inCard }): JSX.Element {
  const Wrapper = useMemo(() => inCard ? CardContainer : Container, [inCard])

  return (
    <Wrapper>
      <ItemsWrapper>
        <Skeleton width={50} height={50} borderRadius={10} />
        <Skeleton width={50} height={50} borderRadius={10} />
        <Skeleton width={50} height={50} borderRadius={10} />
        <Skeleton width={18} height={18} />
      </ItemsWrapper>

      <Skeleton width={50} height={50} borderRadius={10} />
    </Wrapper>
  )
}

const containerCssStyles = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  min-width: 400px;

  @media screen and (max-width: 835px) {
    min-width: 276px;
  }
`

const Container = styled.div`
  ${containerCssStyles}
`

const CardContainer = styled(Box)`
  ${containerCssStyles}
  margin-bottom: 15px;
`

const ItemsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export default PreviewItemsListSkeleton
