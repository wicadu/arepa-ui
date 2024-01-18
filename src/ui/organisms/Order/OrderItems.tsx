import React, { useMemo } from 'react'

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
    items?.slice(_NUMBER_OF_DISPLAYED_ITEMS) || [],
  ], [items])

  return (
    <Row gap={2}>
      {displayedItems?.map(({ id, image }) => image ? (
        <Image src={image} key={id} size={50} withBackground />
      ) : (
        <Icon name='local_cafe' key={id} size={50} withBackground />
      ))}

      <Typography type='description' size={20} weight={700}>+{remainingItems}</Typography>
    </Row>
  )
}

export default OrderItems
