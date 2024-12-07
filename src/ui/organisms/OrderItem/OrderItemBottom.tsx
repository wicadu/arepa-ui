import React, { useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'

import Typography from '../../atoms/Typography'
import Icon from '../../atoms/Icon'
import Spin from '../../atoms/Spin'

const translate = {
  es: {
    SUBTRACT_ARIA_LABEL: 'Disminuir cantidad del producto',
    INCREASE_ARIA_LABEL: 'Aumentar cantidad del producto',
    HANDLER_ARIA_LABEL: 'Controlador de cantidad',
  },
  en: {},
  pt: {},
}

enum ActionType {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}

interface Props {
  initialQuantity: number
  onChangeQuantity: (
    type: ActionType,
    quantity: number,
    onRevertQuantity: () => void
  ) => void
  minQuantity: number
  maxQuantity: number
  disabled?: boolean
  editable?: boolean
  loading: boolean
  lang: string
}

const defaultProps: Partial<Props> = {
  minQuantity: 0,
  maxQuantity: Infinity,
  disabled: false,
  loading: false,
  lang: 'es',
}

function OrderItemBottom(props: Props) {
  const {
    initialQuantity,
    onChangeQuantity,
    minQuantity,
    maxQuantity,
    disabled,
    editable,
    loading,
    lang,
  } = {
    ...defaultProps,
    ...props,
  }

  const [quantity, setQuantity] = useState<number>(initialQuantity)
  const [revertingQuantity, setRevertingQuantity] = useState<boolean>(false)

  const onRevertQuantity = useCallback(() => setRevertingQuantity(true), [])

  const onChange = useCallback(
    (type: ActionType) => {
      let newQuantity: number = quantity

      if (type === ActionType.ADD) newQuantity += 1
      else newQuantity -= 1

      setQuantity(newQuantity)
      onChangeQuantity?.(type, newQuantity, onRevertQuantity)
    },
    [quantity, setQuantity, onChangeQuantity, onRevertQuantity]
  )

  const onAddQuantity = useCallback(() => {
    if (quantity >= maxQuantity || disabled || loading) return

    onChange(ActionType.ADD)
  }, [onChange, disabled, loading])

  const onSubtractQuantity = useCallback(() => {
    if (quantity <= minQuantity || disabled || loading) return

    onChange(ActionType.SUBTRACT)
  }, [onChange, disabled, loading])

  useEffect(() => {
    if (initialQuantity !== quantity && revertingQuantity) {
      setQuantity(initialQuantity)
      setRevertingQuantity(false)
    }

    if (initialQuantity !== quantity) {
      setQuantity(initialQuantity)
    }
  }, [initialQuantity, revertingQuantity])

  return (
    <Container aria-label={translate[lang].HANDLER_ARIA_LABEL}>
      <IconWrapper
        onClick={onSubtractQuantity}
        show={editable}
        children={
          <>
            <meta
              itemProp="name"
              content={translate[lang].SUBTRACT_ARIA_LABEL}
            />
            <Icon name="remove" size={15} />
          </>
        }
        aria-label={translate[lang].SUBTRACT_ARIA_LABEL}
        itemScope
        itemProp="action"
        itemType="http://schema.org/Action"
      />

      {loading ? (
        <Spin center size={14} type="white" />
      ) : (
        <Typography
          type="description"
          size={13}
          align="center"
          dangerouslySetInnerHTML={{ __html: `<b>${quantity}</b> unidades` }}
        />
      )}

      <IconWrapper
        onClick={onAddQuantity}
        show={editable}
        children={
          <>
            <meta
              itemProp="name"
              content={translate[lang].INCREASE_ARIA_LABEL}
            />
            <Icon name="add" size={15} />
          </>
        }
        aria-label={translate[lang].INCREASE_ARIA_LABEL}
        itemProp="action"
        itemScope
        itemType="http://schema.org/UpdateAction"
      />
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
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  p[type='description'] {
    margin: auto;
  }

  @media screen and (min-width: 768px) {
    p[type='description'] {
      font-size: 16px !important;
    }

    .material-icons {
      font-size: 20px;
    }
  }
`

const IconWrapper = styled.button`
  background: none;
  border: none;
  padding: 0px;

  ${({ show }) => !show && `display: none;`}
`

export default OrderItemBottom
