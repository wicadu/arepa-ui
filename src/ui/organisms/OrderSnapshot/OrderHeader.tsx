import React from 'react'

import { dateFormat } from '../../../utils'
import { useTheme } from '../..'

import Row from '../../layout/Row'
import Typography from '../../atoms/Typography'
import StatusChip from '../../molecules/StatusChip/StatusChip'

const statusAsTypes = {
  PREPARED: 'info',
  PICKED: 'success',
  DELIVERED: 'success',
  CANCELED: 'error',
  DRAFTING: 'info',
}

type Props = {
  orderId: string | number
  date: string
  status: string
  showStatusChip: boolean,
}

function OrderHeader({ orderId, status, showStatusChip, date }: Props) {
  const { colors } = useTheme()

  return (
    <Row align='space-between'>
      {showStatusChip ? (
        <StatusChip
          type={statusAsTypes[status]}
          text={String(orderId)}
          textColor={colors.FONT.TITLE}
        />
      ) : (
        <Typography weight={700} size={16}>{String(orderId)}</Typography>
      )}

      <Typography type='description' size={14}>
        {dateFormat(date, { language: 'es-CL', withHours: true })}
      </Typography>
    </Row>
  )
}

export default OrderHeader
