
import React from 'react'

import { dateFormat } from '../../../utils'

import UserCard from '../../molecules/UserCard/UserCard'
import Column from '../../layout/Column'
import Row from '../../layout/Row'
import Typography from '../../atoms/Typography'
import StatusChip from '../../molecules/StatusChip/StatusChip'

interface Props {
  user: {
    image?: string
    name?: string
    email?: string
  },
  createdAt?: string
  editable?: boolean
  onClick?: () => void
}

const defaultProps: Partial<Props> = {
  onClick: null
}

function OrderUserCard({ createdAt, user, status, onClick }: Props): JSX.Element {

  return (
    <Column gap={5}>
      <Row align='space-between'>
        <StatusChip type={status.type} text={status.text} />
        <Typography type='description' size={14}>{dateFormat(createdAt, 'es-CL', true)}</Typography>
      </Row>

      <UserCard
        image={user?.image}
        name={user?.name}
        description={user?.email}
      />
    </Column>
  )
}

OrderUserCard.defaultProps = defaultProps

export default OrderUserCard
