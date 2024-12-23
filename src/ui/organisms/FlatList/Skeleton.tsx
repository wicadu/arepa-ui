import React from 'react'

import Column from '../../layout/Column'

interface Props {
  skeleton: React.FC
}

function FlatListSkeleton({ skeleton: Skeleton }: Props) {
  return (
    <Column gap={10}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Column>
  )
}

export default FlatListSkeleton
