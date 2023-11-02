import React from 'react'

import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'

import Box from '../atoms/Box'

function ItemSnippetInCardSkeleton () {
  return (
    <Container>
      <Skeleton height={145} />

      <Skeleton height={12} wrapper={TitleWrapper} />
      <Skeleton height={8} count={2} />
    </Container>
  )
}

const Container = styled(Box)`
  display: inline-block;
  position: relative;
`

const TitleWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
`

export default ItemSnippetInCardSkeleton
