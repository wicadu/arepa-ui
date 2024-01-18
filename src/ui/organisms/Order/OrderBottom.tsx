import React from 'react'

import Row from '../../layout/Row'
import Typography from '../../atoms/Typography'
import Column from '../../layout/Column'

type Props = {}

function OrderBottom({}: Props) {
  return (
    <Column gap={5}>
      <Row align='space-between'>
        <Typography type='helper' weight={700}>
          Documentos adicionales (5)
        </Typography>
        <Typography type='helper' weight={700}>Total</Typography>
      </Row>

      <Row align='space-between' gap={10}>
        <Typography numberOfLines={1}>Boleta 1, Factura 2, dasdada sad as</Typography>
        <Typography>5.530.200$</Typography>
      </Row>
    </Column>
  )
}

export default OrderBottom
