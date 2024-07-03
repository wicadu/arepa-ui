import React, { useMemo } from 'react'

import Typography, { TypographyProps } from '../atoms/Typography'
import { formatCurrency } from '../../utils'

interface Props extends Partial<TypographyProps> {
  currencyCode: string
  amount: number
}

const defaultProps: Partial<Props> = {
  currencyCode: 'clp',
  amount: 0
}

function Pricing({
  currencyCode,
  amount,
  size,
  weight,
}: Props) {
  const formattedAmount = useMemo(() => formatCurrency(amount, { currency: currencyCode }), [
    currencyCode,
    amount
  ])

  const [, currencySign, value] = formattedAmount?.match(/^(\D*)(\d.*)$/) || []

  return (
    <Typography
      size={size}
      weight={weight}
      afterStyles={{
        content: currencySign,
        size: 12,
        weight: 500,
      }}
    >
      {value || '$?'}
    </Typography>
  )
}

Pricing.defaultProps = defaultProps

export default Pricing
