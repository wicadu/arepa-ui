import React from 'react'
import styled from '@emotion/styled'

import OrderItem from '../OrderItem/OrderItem'
import DraftBottomActions from './DraftBottomActions'

interface Item {
  label: string
  image: string | null
  name: string
  description: string
  price: string
  quantity: number
  specs: any
}

interface Props {
  item: Item,
  minQuantity?: number
  maxQuantity?: number
  disabled?: boolean
  editable?: boolean
  onChange?: () => void,
  onClose?: () => void
  onClick?: () => void
}

const defaultProps: Partial<Props> = {
  minQuantity: 0,
  maxQuantity: Infinity,
  editable: false,
  disabled: false,
  onChange: null,
  onClose: null,
  onClick: null
}

function DraftOrderItem({
  item,
  onClick,
  editable,
  disabled,
  minQuantity,
  maxQuantity,
  onChange,
}: Props) {
  return (
    <Container onClick={onClick}>
      <OrderItem
        label={item?.label}
        image={item?.image}
        name={item?.name}
        description={item?.description}
        price={item.price}
        specs={item?.specs}
      />

      <DraftBottomActions
        disabled={disabled || !editable}
        editable={editable}
        initialQuantity={item?.quantity}
        minQuantity={minQuantity}
        maxQuantity={maxQuantity}
        onChangeQuantity={onChange}
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
