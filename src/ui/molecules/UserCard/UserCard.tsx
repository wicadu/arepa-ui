import React from 'react'

import Typography from '../../atoms/Typography'
import Image from '../../atoms/Image'
import Icon from '../../atoms/Icon'
import Column from '../../layout/Column'
import Row from '../../layout/Row'

interface Props {
  image?: string
  name: string
  description: string
  defaultIcon?: string
}

const defaultProps: Partial<Props> = {
  name: '',
  description: '',
  image: '',
  defaultIcon: 'account_circle',
}

function UserCard({ name, image, description }: Props) {
  return (
    <Column gap={5}>
      <Row gap={10}>
        {image
          ? <Image src={image} width={50} height={50} rounded={50} />
          : <Icon name='account_circle' size={50} />
        }
        <Column align='top'>
          <Typography size={16} weight={700}>{name}</Typography>
          <Typography type='description' size={14}>{description}</Typography>
        </Column>
      </Row>
    </Column>
  )
}

UserCard.defaultProps = defaultProps

export default UserCard
