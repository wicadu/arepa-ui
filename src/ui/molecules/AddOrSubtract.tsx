import React, { useState, useCallback, useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Spin from '../atoms/Spin'
import Typography from '../atoms/Typography'
import Icon from '../atoms/Icon'
import Form from '../hocs/Form'

enum ActionType {
  'ADD',
  'SUBTRACT',
}

enum addOrSubtractType {
  primary = 'primary',
  success = 'success',
  error = 'error',
  warning = 'warning',
  ghost = 'ghost',
}

const propTypes = {
  name: PropTypes.string,
  initialQuantity: PropTypes.number.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  maxQuantity: PropTypes.number,
  minQuantity: PropTypes.number,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  containerStyles: PropTypes.object,
  inverse: PropTypes.bool,
  type: PropTypes.oneOf<addOrSubtractType>(Object.values(addOrSubtractType)),
  label: PropTypes.string,
}

type Props = InferProps<typeof propTypes>

const defaultProps: Props = {
  initialQuantity: 0,
  onChangeQuantity() {},
  maxQuantity: 1,
  minQuantity: 0,
  disabled: false,
  loading: false,
  type: addOrSubtractType.primary,
}

function AddOrSubtractComponent({
  name,
  initialQuantity,
  maxQuantity,
  minQuantity,
  disabled,
  loading,
  type,
  onChangeQuantity,
  label,
}: Props) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const { register, errors } = Form.useForm()
  const hasError = useMemo(() => errors[name]?.message?.length, [errors[name]])

  const onChange = useCallback(
    (type: ActionType) => {
      let newQuantity: number = quantity

      if (type === ActionType.ADD) newQuantity += 1
      else newQuantity -= 1

      setQuantity(newQuantity)
      onChangeQuantity?.(newQuantity)
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
    <Wrapper>
      {label && <Typography weight={700}>{label}</Typography>}

      <AddOrSubtract type={type}>
        <Icon
          name="fas fa-minus"
          color="white"
          onClick={onSubtractQuantity}
          size={14}
        />

        {loading ? (
          <Spin />
        ) : (
          <InputAsCount
            ref={register()}
            name={name}
            id={name}
            value={quantity}
          />
        )}

        <Icon
          name="fas fa-plus"
          color="white"
          onClick={onAddQuantity}
          size={14}
        />
      </AddOrSubtract>

      {hasError && <ErrorMessage>{errors[name]?.message}</ErrorMessage>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const AddOrSubtract = styled.div<Props>`
  height: 42px;
  width: 180px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background-color: ${({ type, theme }) => {
    if (type === addOrSubtractType.ghost) return theme.colors.FONT.DESCRIPTION

    return theme.colors.MAIN?.[String(type).toUpperCase()]
  }};
`

const InputAsCount = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.FONT.CONTRAST};
  font-weight: 700;
  text-align: center;
  background: ${({ theme }) => theme.colors.NEUTRAL.TRANSPARENT};
  border: none;
`

const ErrorMessage = styled.small`
  color: ${({ theme }: any) => theme.colors.MAIN.ERROR};
  padding: 0 5px;
`

AddOrSubtract.propTypes = propTypes
AddOrSubtract.defaultProps = defaultProps

export default AddOrSubtractComponent
