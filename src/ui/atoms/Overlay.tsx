import React from 'react'

import styled from '@emotion/styled'
import { hexToRGBA } from '../../utils'

type Props = {
  backgroundColor?: string
  zIndex?: number
}

function Overlay({ backgroundColor, zIndex }: Props): React.ReactElement {
  return <Wrapper backgroundColor={backgroundColor} zIndex={zIndex} />
}

const Wrapper = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: ${({ zIndex }) => zIndex};

  background-color: ${({ backgroundColor }) =>
    hexToRGBA(backgroundColor ?? '#000000', 0.95)};
`

export default Overlay
