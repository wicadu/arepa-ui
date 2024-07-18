import React from 'react'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

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
  leftSpace,
  rightSpace,
  styles,
  ...props
}: Props) {
  return (
    <Container
      spaceType={spaceType}
      verticalSpace={verticalSpace}
      horizontalSpace={horizontalSpace}
      topSpace={topSpace}
      bottomSpace={bottomSpace}
      leftSpace={leftSpace}
      rightSpace={rightSpace}
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
  leftSpace?: number
  rightSpace?: number
  verticalSpace?: number
  horizontalSpace?: number
  styles?: string | SerializedStyles
}

const Container = styled.div<ContainerProps>`
  ${({
    spaceType,
    verticalSpace,
    horizontalSpace,
    topSpace,
    bottomSpace,
    leftSpace,
    rightSpace,
  }) => {
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

    if (leftSpace) {
      styles += `
        ${spaceType}-left: ${leftSpace}px;
      `
    }

    if (rightSpace) {
      styles += `
        ${spaceType}-right: ${rightSpace}px;
      `
    }

    return styles
  }}

  ${({ styles }) => styles}
`

export default Spacer
