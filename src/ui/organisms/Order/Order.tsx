import React from 'react'

import styled from '@emotion/styled'

import OrderHeader from './OrderHeader'
import OrderItems from './OrderItems'
import OrderBottom from './OrderBottom'

type Props = {
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

function Order({ onClick }: Props) {
  return (
    <Wrapper onClick={onClick}>
      <OrderHeader orderId={44} date="2023-12-28T14:59:23Z" />
      <OrderItems />
      <OrderBottom />
    </Wrapper>
  )
}

const Wrapper = styled.article``


export default Order
