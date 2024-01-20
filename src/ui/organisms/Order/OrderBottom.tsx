import React, { useMemo } from 'react'

import Row from '../../layout/Row'
import Typography from '../../atoms/Typography'
import Column from '../../layout/Column'
import { formatCurrency } from '../../../utils'

type Props = {
  docs: string[]
  totalPaid: {
    key: string
    value: number
  }
}

function OrderBottom({ totalPaid, docs }: Props) {
  const thereAreNotDocs = useMemo(() => !docs?.length, [docs])
  const docsParsed = useMemo(() => String(docs).toLocaleLowerCase(), [docs])

  if (thereAreNotDocs) {
    return (
      <Column gap={0}>
        <Typography type='helper' align='right' weight={700}>Total</Typography>
        <Typography align='right'>{formatCurrency(totalPaid?.value)}</Typography>
      </Column>
    )
  }

  return (
    <Column gap={0}>
      <Row align='space-between'>
        <Typography type='helper' weight={700}>
          Documentos adicionales ({docs?.length})
        </Typography>
        <Typography type='helper' weight={700}>Total</Typography>
      </Row>

      <Row align='space-between' gap={10}>
        <Typography numberOfLines={1}>{docsParsed}</Typography>
        <Typography>{formatCurrency(totalPaid?.value)}</Typography>
      </Row>
    </Column>
  )
}

export default OrderBottom
