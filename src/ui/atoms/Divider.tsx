import React from 'react'
import styled from '@emotion/styled'

type Props = {
  width?: number
  thickness?: 0 | 1 | 2 | 3 | 4
  color?: string
  verticalMargin?: number
}

function Divider({
  width = 100,
  thickness = 1,
  color,
  verticalMargin = 15,
  ...props
}: Props): React.ReactElement {
  return (
    <Container
      width={width}
      thickness={thickness}
      color={color}
      verticalMargin={verticalMargin}
      {...props}
    />
  )
}

const Container = styled.div<Props>`
  height: ${({ thickness }) => thickness}px;
  width: ${({ width }) => width}%;
  background-color: ${({ color, theme }) =>
    color || theme.colors.NEUTRAL.SELECTED};
  margin: ${({ verticalMargin }) => verticalMargin}px 0;
`

export default Divider
