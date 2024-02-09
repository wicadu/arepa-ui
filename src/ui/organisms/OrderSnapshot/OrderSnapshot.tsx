import React from 'react'

import Column from '../../layout/Column'

import OrderHeader from './OrderHeader'
import OrderBottom from './OrderBottom'
import OrderBody from './OrderBody'

type Props = {
  id: number
  date: string
  status: string
  docs: {
    total: number
    names: string[]
  }
  price: {
    currency: string
    amount: number
  }
  items: {
    preview: string[]
    total: number
  }
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

function OrderSnapshot({
  id,
  date,
  status,
  docs,
  price,
  items,

  onClick
}: Props): JSX.Element {

  return (
    <Column gap={10} onClick={onClick}>
      <OrderHeader orderId={id} status={status} date={date} />
      <OrderBody items={items} />
      <OrderBottom price={price} docs={docs} />
    </Column>
  )
}

export default OrderSnapshot
