import React, { useMemo } from 'react'

import styled from '@emotion/styled'

import Icon from '../../atoms/Icon'
import Row from '../../layout/Row'
import Typography from '../../atoms/Typography'
import Image from '../../atoms/Image'

type Props = {
  items: any[]
}

const _NUMBER_OF_DISPLAYED_ITEMS = 3

function OrderItems({ items }: Props) {
  const [displayedItems, remainingItems] = useMemo(() => [
    items?.slice(0, _NUMBER_OF_DISPLAYED_ITEMS) || [],
    items?.slice(_NUMBER_OF_DISPLAYED_ITEMS)?.length || 0,
  ], [items])

  return (
    <Row gap={15}>
      <Row gap={5}>
        {displayedItems?.map(({ id, image }) => image ? (
          <Image src={image} key={id} size={45} withBackground />
        ) : (
          <Icon name='image' key={id} size={45} withBackground={0.6} />
        ))}
      </Row>

      <TotalOfRemainingItems type='description' size={16} show={!!remainingItems}>
        +{remainingItems}
      </TotalOfRemainingItems>
    </Row>
  )
}

const TotalOfRemainingItems = styled(Typography)`
  width: 45px;
  height: 45px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.NEUTRAL.SELECTED};

  ${({ show }) => !show && 'display: none;'}
`

export default OrderItems
