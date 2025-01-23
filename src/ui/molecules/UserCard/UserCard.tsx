import React from 'react'

import styled from '@emotion/styled'

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
  role?: string
  className?: string
  onClick?: () => void
}

const defaultProps: Partial<Props> = {
  name: '',
  description: '',
  role: '',
  image: '',
  defaultIcon: 'account_circle',
  className: '',
  onClick() {},
}

function UserCard(props: Props) {
  const { name, image, description, role, className, onClick } = {
    ...defaultProps,
    ...props,
  }

  return (
    <Container gap={5} onClick={onClick} className={className}>
      {role && (
        <Typography
          type="helper"
          children={role as string}
          size={12}
          weight={700}
        />
      )}

      <Row gap={10}>
        {image ? (
          <Image
            src={image}
            alt={`${name}'s profile`}
            width={50}
            height={50}
            rounded={50}
          />
        ) : (
          <Icon name="account_circle" size={50} />
        )}
        <Column gap={0} align="top">
          <Typography type="default" size={16} weight={700} children={name} />
          <Typography type="description" size={14} children={description} />
        </Column>
      </Row>
    </Container>
  )
}

const Container = styled(Column)`
  img,
  .material-icons {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
`

export default UserCard
