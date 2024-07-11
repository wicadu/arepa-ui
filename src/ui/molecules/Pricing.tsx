import React, { useMemo } from 'react'

import Typography, { TypographyProps } from '../atoms/Typography'
import { formatCurrency } from '../../utils'

interface Props extends Partial<TypographyProps> {
  currencyCode: string
  amount: number
  currencySize?: number
  currencyWeight?: number
}

const defaultProps: Partial<Props> = {
  currencyCode: 'clp',
  amount: 0,
  currencySize: 12,
  currencyWeight: 500
}

function Pricing({
  color,
  currencyCode,
  amount,
  size,
  weight,
  currencySize,
  currencyWeight,
}: Props) {
  const formattedAmount = useMemo(() => formatCurrency(amount, { currency: currencyCode }), [
    currencyCode,
    amount
  ])

  const [, currencySign, value] = formattedAmount?.match(/^(\D*)(\d.*)$/) || []

  return (
    <Typography
      color={color}
      size={size}
      weight={weight}
      afterStyles={{
        color,
        content: currencySign,
        size: currencySize,
        weight: currencyWeight,
      }}
    >
      {value || '$?'}
    </Typography>
  )
}

Pricing.defaultProps = defaultProps

export default Pricing
