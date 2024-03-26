import React from 'react'

import styled from '@emotion/styled'

import Icon from '../../atoms/Icon'
import Row from '../../layout/Row'
import Typography from '../../atoms/Typography'
import Image from '../../atoms/Image'

type Props = {
  items: {
    preview: string[]
    total: number
  }
  users: { image: string }[]
}

function OrderBody({ items }: Props) {
  return (
    <Container>
      <Row align='space-between'>
        <Row gap={10}>
          <Row gap={5}>
            {items.preview?.map((image, index) => image ? (
              <Image src={image} key={index} width={45} height={45} />
            ) : (
              <Icon name='image' key={index} size={45} withBackground={0.6} />
            ))}
          </Row>

          <TotalOfRemainingItems type='description' size={16} show={items.total > 0}>
            +{items.total}
          </TotalOfRemainingItems>
        </Row>

        <Users>
          {null
            ? <Image src={null} width={35} height={35} rounded />
            : <Icon name='account_circle' size={35} />
          }
        </Users>
      </Row>
    </Container>
  )
}


const Container = styled.div`
  position: relative;
`

const TotalOfRemainingItems = styled(Typography)`
  width: 45px;
  height: 45px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.NEUTRAL.SIDE};

  ${({ show }) => !show && 'display: none;'}
`

const Users = styled.div<any>`
  position: absolute;
  right: 0px;
  top: 0px;
`

export default OrderBody
