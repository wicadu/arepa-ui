import React from 'react'

import OrderHeader from './OrderHeader'
import OrderItems from './OrderItems'
import OrderBottom from './OrderBottom'
import Column from '../../layout/Column'

type Props = {
  id?: number
  items: any[]
  totalPaid: {
    key: string
    value: number
  }
  date: string
  status: string
  docs: string[]
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

function Order({
  id,
  items,
  totalPaid,
  date,
  status,
  docs,
  onClick
}: Props): JSX.Element {

  return (
    <Column gap={7} onClick={onClick}>
      <OrderHeader orderId={id} status={status} date={date} />
      <OrderItems items={items} />
      <OrderBottom totalPaid={totalPaid} docs={docs} />
    </Column>
  )
}

export default Order
