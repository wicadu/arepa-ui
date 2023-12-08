import React from 'react'
import styled from '@emotion/styled'

import Skeleton from 'react-loading-skeleton'

function ItemOverviewAsListSkeleton() {
  return (
    <Container>
      <Skeleton height={8} width={120} />

      <Content>
        <Skeleton height={54} width={54} />

        <ItemContent>
          <Skeleton height={15} width={200} />
          <Skeleton height={12} count={2} />

          <SpecsWrapper>
            <Skeleton height={15} width={20} />
            <Skeleton height={15} width={40} />
          </SpecsWrapper>
        </ItemContent>
      </Content>
    </Container>
  )
}

const Container = styled.article`
  flex-direction: column;
  display: flex;
  gap: 5px;
`

const Content = styled.div`
  display: flex;
  gap: 5px;
`

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const SpecsWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 5px;
`

export default ItemOverviewAsListSkeleton
