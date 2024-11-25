import React from 'react'

import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

type ItemsAlign = 'left' | 'center' | 'right' | 'space-between'

interface Props {
  children: React.ReactNode | React.ReactElement | React.ReactElement[]
  align?: ItemsAlign
  gap: number
  flex?: number
  styles?: string | SerializedStyles
  onClick?: () => void
  itemProp?: string
  itemScope?: boolean
  itemType?: string
  className?: string
  forwardedRef?: React.Ref<HTMLDivElement>
}

const defaultProps: Partial<Props> = {
  children: '',
  gap: 0,
  styles: '',
  className: '',
}

function Row(props: Props) {
  const {
    children,
    align,
    gap,
    flex,
    styles,
    onClick,
    itemProp,
    itemScope,
    itemType,
    className,
    forwardedRef,
    ...restOfProps
  } = {
    ...defaultProps,
    ...props,
  }

  return (
    <Container
      align={align}
      gap={gap}
      flex={flex}
      styles={styles}
      itemProp={itemProp}
      itemScope={itemScope}
      itemType={itemType}
      className={className}
      onClick={onClick}
      ref={forwardedRef}
      {...restOfProps}
    >
      {children}
    </Container>
  )
}

const Container = styled.div<Partial<Props>>`
  display: flex;
  align-items: center;

  ${({ gap }) => (gap ? `gap: ${gap}px;` : '')}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}

  ${({ align }) => {
    let styles: string = ''

    if (align === 'left') styles += 'justify-content: flex-start;'
    if (align === 'center') styles += 'justify-content: center;'
    if (align === 'right') styles += 'justify-content: flex-end;'
    if (align === 'space-between') styles += 'justify-content: space-between;'

    if (styled.length === 0) styles += 'flex: 1;'

    return styles
  }}

  ${({ styles }) => styles}
`

export default Row
