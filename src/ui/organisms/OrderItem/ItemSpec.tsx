import React from 'react'
import styled from '@emotion/styled'

import Typography from '../../atoms/Typography'

interface ItemSpecProps {
  name?: string
  value?: string | number
}

function ItemSpec({ name, value }: ItemSpecProps): JSX.Element {
  if (value === undefined) return <React.Fragment />

  return (
    <Wrapper>
      <Typography type="helper" weight={700} size={16}>
        {value}
      </Typography>
      <Typography type="helper" size={16}>
        {name}
      </Typography>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`

export default ItemSpec
