import React from 'react'

import { dateFormat } from '../../../utils'
import { useTheme } from '../..'

import Row from '../../layout/Row'
import Typography from '../../atoms/Typography'
import StatusChip from '../../molecules/StatusChip/StatusChip'

const statusAsTypes = {
  PREPARED: 'INFO',
  PICKED: 'SUCCESS',
  DELIVERED: 'SUCCESS',
  CANCELED: 'ERROR',
  DRAFTING: 'INFO',
}

type Props = {
  orderId: string | number
  date: string
  status: string
}

function OrderHeader({ orderId, status, date }: Props) {
  const { colors } = useTheme()

  return (
    <Row align='space-between'>
      <StatusChip
        type={statusAsTypes[status]}
        text={String(orderId)}
        textColor={colors.FONT.TITLE}
      />

      <Typography type='description' size={14}>{dateFormat(date, 'es-CL', true)}</Typography>
    </Row>
  )
}

export default OrderHeader
