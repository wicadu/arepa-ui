import React from 'react'

import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'

import Box from '../atoms/Box'

function ItemSnippetInListSkeleton () {
  return (
    <Container>
      <Skeleton borderRadius={10} width='100%' height={80} />
      <div>
        <Skeleton height={18} width={80} style={{ marginBottom: 5 }} />
        <Skeleton height={12} width='95%' />
        <Skeleton height={12} width='80%' />
        <Skeleton height={12} width={60} />
      </div>
      <Skeleton borderRadius={10} width={50} height={50} />
    </Container>
  )
}

const Container = styled(Box)`
  width: 100%;  
  display: grid;
  grid-template-columns: 80px 1fr 50px;
  align-content: center;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 468px) {
    grid-template-columns: 60px 1fr 50px;
    gap: 5px;
  }
`

export default ItemSnippetInListSkeleton
