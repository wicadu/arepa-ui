import React from 'react'

import styled from '@emotion/styled'

import Box from '../atoms/Box'
import PreviewItemsList from '../atoms/PreviewItemsList'

import Skeleton from 'react-loading-skeleton'

function OrderSnippetSkeleton () {
  return (
    <Container>
      <Header>
        <Skeleton width={75} height={22} />        
        <Skeleton width={30} height={14} />
        <Skeleton width={50} height={8} />
      </Header>
      <Content>
        <PreviewItemsList.Skeleton />
      </Content>
    </Container>
  )
}

const Container = styled(Box)`
  display: grid;
  gap: 10px;
  margin-bottom: 15px;
`

const Header = styled.div`
  display: grid;
  align-items: center;
  gap: 10px;
  grid-template-columns: auto auto 1fr;

  & *:last-child {
    justify-self: flex-end;
  }
`

const Content = styled.div`
  display: grid;
  justify-content: end;
`

export default OrderSnippetSkeleton
