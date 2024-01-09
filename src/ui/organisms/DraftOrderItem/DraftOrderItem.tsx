import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import { formatCurrency } from '../../../utils'

import OrderItem from '../OrderItem/OrderItem'
import DraftOrderItemBottomActions from './BottomActions'

interface Props {
  item: {
    label: string
    image: string | null
    name: string
    description: string
    quantity: number
    price: number
    spec: any
  },
  maxQuantity?: number
  onChangeQuantity?: () => void
  disabled?: boolean
  editable?: boolean
  onClick?: () => void
}

const defaultProps: Partial<Props> = {
  maxQuantity: Infinity,
  editable: false,
  disabled: false,
  onChangeQuantity: null,
  onClick: null
}

function DraftOrderItem({
  item,
  maxQuantity,
  editable,
  disabled,
  onClick,
  onChangeQuantity
}: Props) {
  const totalPrice = useMemo(() => item?.quantity * item?.price, [item?.quantity, item?.price])

  return (
    <Container onClick={onClick}>
      <OrderItem
        label={item?.label}
        image={item?.image}
        name={item?.name}
        description={item?.description}
        spec={item?.spec}
        quantity={typeof item?.price === 'number' ? {
          value: `${formatCurrency(item?.price)} • ${formatCurrency(totalPrice)}`
        } : {}}
      />
      <DraftOrderItemBottomActions
        disabled={disabled || !editable}
        editable={editable}
        initialQuantity={item?.quantity}
        minQuantity={0}
        maxQuantity={maxQuantity}
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
