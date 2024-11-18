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
  currencyWeight: 500,
}

function Pricing(props: Props) {
  const {
    color,
    currencyCode,
    amount,
    size,
    weight,
    currencySize,
    currencyWeight,
    ...restOfProps
  } = {
    ...defaultProps,
    ...props,
  }

  const isNegativeValue: boolean = useMemo(() => amount < 0, [amount])

  const formattedAmount = useMemo(
    () => formatCurrency(amount, { currency: currencyCode }),
    [currencyCode, amount]
  )

  const [, currencySign, value] = formattedAmount?.match(/^(\D*)(\d.*)$/) || []

  const fCurrencySign: string = currencySign?.replace('-', '') || ''

  return (
    <Typography
      {...restOfProps}
      color={color}
      size={size}
      weight={weight}
      afterStyles={{
        color,
        content: fCurrencySign,
        size: currencySize,
        weight: currencyWeight,
      }}
    >
      <meta itemProp="priceCurrency" content={currencyCode} />

      {isNegativeValue ? `-${value}` : value || '$?'}
    </Typography>
  )
}

export default Pricing
