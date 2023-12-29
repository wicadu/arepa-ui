import React from 'react'

import Typography from '../../../atoms/Typography'

type TypeOptions = 'label' | 'title' | 'description'

interface ItemTextProps {
  type: TypeOptions
  content: string
  numberOfLines: 1 | 2
}

const _typographyOptions = {
  label: {
    type: 'helper',
    weight: 'bold',
  },
  title: {
    type: 'title-4',
    size: 16,
  },
  description: {
    type: 'description',
    size: 12,
  },
} as object

function ItemText({ type, content, numberOfLines }: ItemTextProps) {
  const typographyOption = _typographyOptions[type]

  if (!typographyOption) {
    return null
  }

  const { type: typographyType, size, weight } = typographyOption

  return (
    <Typography
      type={typographyType}
      size={size}
      weight={weight}
      numberOfLines={numberOfLines}
    >
      {content}
    </Typography>
  )
}

export default ItemText
