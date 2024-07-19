import React from 'react'

import Column from '../../layout/Column'

import OrderHeader from './OrderHeader'
import OrderBottom from './OrderBottom'
import OrderBody from './OrderBody'
import Alert from '../../molecules/Alert'

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
  alert: {
    type?: string
    title: string
    description: string
  }
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
}

function OrderSnapshot({
  id,
  date,
  status,
  alert,
  docs,
  price,
  items,
  onClick
}: Props): JSX.Element {

  return (
    <Column gap={10} onClick={onClick}>
      <Alert
        size='small'
        type={alert?.type}
        title={alert?.title}
        description={alert?.description}
        show={Boolean(alert?.type)}
      />
      
      <OrderHeader
        orderId={id}
        date={date}
        status={status}
        showStatusChip={!Boolean(alert?.type)}
      />
      <OrderBody items={items} />
      <OrderBottom price={price} docs={docs} />
    </Column>
  )
}

export default OrderSnapshot
