import React from 'react'

import styled from '@emotion/styled'

import { dateFormat, hexToRGBA } from '../../../utils'
import Icon from '../../atoms/Icon'
import Row from '../../layout/Row'
import Typography from '../../atoms/Typography'

type Props = {
  orderId: string | number
  date: string
}

function OrderHeader({ orderId, date }: Props) {
  return (
    <Row align='space-between'>
      <Row gap={5}>
        <CheckIcon name='check_circle' size={17} />
        <Typography weight={700}>{orderId}</Typography>
      </Row>

      <Typography type='description' size={14}>{dateFormat(date, 'es-CL', true)}</Typography>
    </Row>
  )
}

const CheckIcon = styled(Icon)`
  ${({ theme }) => `
    color: ${theme.colors.MAIN.SUCCESS};
    background: ${hexToRGBA(theme.colors.MAIN.SUCCESS, 0.1)};
    border-radius: 25px;
    padding: 3px;
    border: 1px solid ${theme.colors.MAIN.SUCCESS};
  `};
`

export default OrderHeader
