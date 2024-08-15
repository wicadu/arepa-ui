import React from 'react'

import Skeleton from 'react-loading-skeleton'

import { css } from '@emotion/react'
import Column from '../../layout/Column'
import Row from '../../layout/Row'


function OrderItemSkeleton() {
  return (
    <Column>
      <Skeleton height={8} width={120} />

      <Row gap={10}>
        <Skeleton height={54} width={54}  />

        <Column styles={cssContentStyles}>
          <Skeleton height={15} width={200} />
          <Skeleton height={12} count={2}  />

          <Row gap={5}>
            <Skeleton height={15} width={20} />
            <Skeleton height={15} width={40} />
          </Row>
        </Column>
      </Row>
    </Column>
  )
}

const cssContentStyles = css`
  width: 100%;
`

export default OrderItemSkeleton
