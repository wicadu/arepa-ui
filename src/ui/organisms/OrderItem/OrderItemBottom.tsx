import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Typography from '../../atoms/Typography'
import Icon from '../../atoms/Icon'
import Spin from '../../atoms/Spin'

enum ActionType {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}

interface Props {
  initialQuantity: number,
  onChangeQuantity: (
    type: ActionType,
    quantity: number,
    onRevertQuantity: () => void
  ) => void,
  minQuantity: number,
  maxQuantity: number,
  disabled?: boolean,
  editable?: boolean
  loading: boolean
}

const defaultProps: Partial<Props> = {
  minQuantity: 0,
  maxQuantity: Infinity,
  disabled: false,
  loading: false,
}

function OrderItemBottom({
  initialQuantity,
  onChangeQuantity,
  minQuantity,
  maxQuantity,
  disabled,
  editable,
  loading
}: Props) {
  const [quantity, setQuantity] = useState<number>(initialQuantity)
  const [revertingQuantity, setRevertingQuantity] = useState<boolean>(false)

  const onRevertQuantity = useCallback(() => setRevertingQuantity(true), [])

  const onChange = useCallback((type: ActionType) => {
    let newQuantity: number = quantity

    if (type === ActionType.ADD) newQuantity += 1
    else newQuantity -= 1

    setQuantity(newQuantity)
    onChangeQuantity?.(type, newQuantity, onRevertQuantity)
  }, [
    quantity,
    setQuantity,
    onChangeQuantity,
    onRevertQuantity
  ])

  const onAddQuantity = useCallback(() => {
    if (quantity >= maxQuantity || disabled || loading) return

    onChange(ActionType.ADD)
  }, [
    onChange,
    disabled,
    loading
  ])

  const onSubtractQuantity = useCallback(() => {
    if (quantity <= minQuantity || disabled || loading) return

    onChange(ActionType.SUBTRACT)
  }, [
    onChange,
    disabled,
    loading
  ])

  useEffect(() => {
    if (initialQuantity !== quantity && revertingQuantity) {
      setQuantity(initialQuantity)
      setRevertingQuantity(false)
    }

    if (initialQuantity !== quantity) {
      setQuantity(initialQuantity)
    }
  }, [
    initialQuantity,
    revertingQuantity,
  ])

  return (
    <Container>
      <Icon name={editable ? 'remove' : '_'} size={15} onClick={onSubtractQuantity} />
      {loading
        ? <Spin center size={14} type='white' />
        : (
          <Typography
            type='description'
            size={13}
            dangerouslySetInnerHTML={{ __html: `<b>${quantity}</b> unidades` }}
          />
        )
      }
      <Icon name={editable ? 'add' : '_'} size={15} onClick={onAddQuantity} />
    </Container>
  )
}

const Container = styled.div`
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.NEUTRAL.SIDE};

  .material-icons {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media screen and (min-width: 768px) {
    p[type="description"] {
      font-size: 16px !important;
    }

    .material-icons {
      font-size: 20px;
    }
  }
`

OrderItemBottom.defaultProps = defaultProps

export default OrderItemBottom
