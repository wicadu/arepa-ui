import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import ItemOverviewAsList from '../ItemOverviewAsList/ItemOverviewAsList'
import DraftOrderItemBottomActions from './BottomActions'
import { formatCurrency } from '../../../utils'
import DraftOrderItemTopAlerts from './TopAlerts'

interface Props {
  item: {
    label: string
    image: string | null
    name: string
    description: string
  }
  price: number
  quantity: number
  onChangeQuantity: () => void
}

const defaultProps: Partial<Props> = {}

function DraftOrderItem({ item, price, quantity, onChangeQuantity }: Props) {
  const totalPrice = useMemo(() => quantity * price, [quantity, price])

  return (
    <Container>
      <DraftOrderItemTopAlerts />
      <ItemOverviewAsList
        label={item?.label}
        image={item?.image}
        name={item?.name}
        description={item?.description}
        quantity={{
          value: `${formatCurrency(price)} • ${formatCurrency(totalPrice)}`
        }}
      />
      <DraftOrderItemBottomActions
        initialQuantity={quantity}
        minQuantity={0}
        maxQuantity={Infinity}
        onChangeQuantity={onChangeQuantity}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

DraftOrderItem.defaultProps = defaultProps

export default DraftOrderItem
