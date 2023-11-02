import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'

import Box from '../atoms/Box'

const propTypes = {
  noSpaces: PropTypes.bool
}

type Props = InferProps<typeof propTypes>

function OrderItemSnippetSkeleton ({ noSpaces }) {
  return (
    <Container noSpaces={noSpaces}>
      <Content>
        <Skeleton height={80} />
        <span>
          <Skeleton height={14} width={120} style={{ marginBottom: 5 }} />
          <Skeleton height={8} />
          <Skeleton height={8} width='80%' />
          <Skeleton height={14} width={80} />
        </span>
      </Content>
      <Quantity>
        <Skeleton width={120} height={10} />
      </Quantity>
    </Container>
  )
}

const Container = styled.div<Props>`
  margin-bottom: ${({ noSpaces }) => noSpaces ? 0 : 10}px;
`

const Content = styled(Box)`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 10px;
  border-radius: 10px 10px 0 0;
`

const Quantity = styled.div<Props>`
  display: flex;
  padding: 0 15px;
  align-items: center;
  border-radius: 0 0 10px 10px;
  height: 30px;
  background: ${({ theme }) => theme.colors.NEUTRAL.SELECTED};
  justify-content: center;
`

export default OrderItemSnippetSkeleton
