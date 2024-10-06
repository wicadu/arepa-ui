import React from 'react'

import { css } from '@emotion/react'

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
  onClick?: () => void
}

const defaultProps: Partial<Props> = {
  name: '',
  description: '',
  image: '',
  defaultIcon: 'account_circle',
  onClick() { }
}

function UserCard(props: Props) {
  const { name, image, description, onClick } = {
    ...defaultProps,
    ...props
  }

  return (
    <Column gap={5} styles={cssContainerStyles} onClick={onClick}>
      <Row gap={10}>
        {image
          ? <Image src={image} width={50} height={50} rounded={50} />
          : <Icon name='account_circle' size={50} />
        }
        <Column gap={0} align='top'>
          <Typography size={16} weight={700}>{name}</Typography>
          <Typography type='description' size={14}>{description}</Typography>
        </Column>
      </Row>
    </Column>
  )
}

const cssContainerStyles = css`
  img, .material-icons {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
`

export default UserCard
