import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'

import Typography from '../../atoms/Typography'
import Icon from '../../atoms/Icon'

enum ActionType {
  'ADD',
  'SUBTRACT',
}

interface Props {
  initialQuantity: number,
  onChangeQuantity: (type: ActionType, onChangeQuantity: number) => void,
  minQuantity: number,
  maxQuantity: number,
  disabled?: boolean,
}

const defaultProps: Props = {
  initialQuantity: 0,
  onChangeQuantity() { },
  minQuantity: 0,
  maxQuantity: 1,
  disabled: false,
}

function DraftOrderItemBottomActions({
  initialQuantity,
  onChangeQuantity,
  minQuantity,
  maxQuantity,
  disabled,
}: Props) {
  const [quantity, setQuantity] = useState<number>(initialQuantity)

  const onChange = useCallback(
    (type: ActionType) => {
      let newQuantity: number = quantity

      if (type === ActionType.ADD) newQuantity += 1
      else newQuantity -= 1

      setQuantity(newQuantity)
      onChangeQuantity?.(type, newQuantity)
    },
    [quantity, setQuantity, onChangeQuantity]
  )

  const onAddQuantity = useCallback(() => {
    if (quantity >= maxQuantity || disabled) return

    onChange(ActionType.ADD)
  }, [onChange])

  const onSubtractQuantity = useCallback(() => {
    if (quantity <= minQuantity || disabled) return

    onChange(ActionType.SUBTRACT)
  }, [onChange])

  return (
    <Container>
      <Icon name='remove' size={15} onClick={onSubtractQuantity} />
      <Typography type='description' size={13}>{quantity} unidades</Typography>
      <Icon name='add' size={15} onClick={onAddQuantity} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.NEUTRAL.SIDE};
`

DraftOrderItemBottomActions.defaultProps = defaultProps

export default DraftOrderItemBottomActions
