import React from 'react'
import styled from '@emotion/styled'

interface Props extends ContainerProps {
  children: React.ReactNode
}

function Spacer({
  children,
  spaceType,
  verticalSpace,
  horizontalSpace,
  topSpace,
  bottomSpace,
  ...props
}: Props) {
  return (
    <Container
      spaceType={spaceType}
      verticalSpace={verticalSpace}
      horizontalSpace={horizontalSpace}
      topSpace={topSpace}
      bottomSpace={bottomSpace}
      {...props}
    >
      {children}
    </Container>
  )
}

interface ContainerProps {
  spaceType: 'margin' | 'padding'
  topSpace?: number
  bottomSpace?: number
  verticalSpace?: number
  horizontalSpace?: number
}

const Container = styled.div<ContainerProps>`
  ${({ spaceType, verticalSpace, horizontalSpace, topSpace, bottomSpace }) => {
    let styles: string = ''

    if (verticalSpace) {
      styles += `
        ${spaceType}-top: ${verticalSpace}px;
        ${spaceType}-bottom: ${verticalSpace}px;
      `
    }

    if (horizontalSpace) {
      styles += `
        ${spaceType}-left: ${horizontalSpace}px;
        ${spaceType}-right: ${horizontalSpace}px;
      `
    }

    if (topSpace) {
      styles += `
        ${spaceType}-top: ${topSpace}px;
      `
    }

    if (bottomSpace) {
      styles += `
        ${spaceType}-bottom: ${bottomSpace}px;
      `
    }

    return styles
  }}
`

export default Spacer
