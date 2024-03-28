import React, { useMemo } from 'react'

import Row from '../../layout/Row'
import Typography from '../../atoms/Typography'
import Column from '../../layout/Column'
import { formatCurrency } from '../../../utils'

type Props = {
  docs: {
    total: number
    names: string[]
  }
  price: {
    currency: string
    amount: number
  }
}

function OrderBottom({ docs, price }: Props) {
  if (!docs?.total) {
    return (
      <Column gap={0}>
        <Typography type='helper' align='right' weight={700}>Total</Typography>
        <Typography weight='bold' align='right'>{formatCurrency(price?.amount)}</Typography>
      </Column>
    )
  }

  return (
    <Column gap={0}>
      <Row align='space-between'>
        <Typography type='helper' weight={700}>
          Documentos adicionales ({docs?.total})
        </Typography>
        <Typography type='helper' weight={700}>Total</Typography>
      </Row>

      <Row align='space-between' gap={15}>
        <Typography numberOfLines={1}>{docs?.names}</Typography>
        <Typography weight='bold'>{formatCurrency(price?.amount)}</Typography>
      </Row>
    </Column>
  )
}

export default OrderBottom
