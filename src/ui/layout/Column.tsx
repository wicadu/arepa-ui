import React from 'react'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

type ItemsAlign = 'top' | 'center' | 'bottom' | 'space-between'

interface Props {
  children?: React.ReactNode
  align?: ItemsAlign
  gap: number
  onClick?: () => void
  flex?: number
  styles?: string | SerializedStyles
  className?: string
  itemProp?: string
  itemScope?: boolean
  itemType?: string
  forwardedRef?: React.Ref<HTMLDivElement>
}

const defaultProps: Partial<Props> = {
  children: null,
  gap: 0,
  className: '',
}

function Column(props: Props) {
  const {
    children,
    align,
    gap,
    flex,
    styles,
    className,
    itemProp,
    itemScope,
    itemType,
    forwardedRef,
    onClick,
  } = {
    ...defaultProps,
    ...props,
  }

  return (
    <Container
      ref={forwardedRef}
      align={align}
      gap={gap}
      flex={flex}
      onClick={onClick}
      className={className}
      itemProp={itemProp}
      itemScope={itemScope}
      itemType={itemType}
      styles={styles}
    >
      {children}
    </Container>
  )
}

const Container = styled.div<Partial<Props>>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ gap }) => (gap ? `gap: ${gap}px;` : '')}

  ${({ flex }) => (flex ? `flex: ${flex};` : '')}

  ${({ align }) => {
    let styles: string = ''

    if (align === 'top') styles += 'justify-content: flex-start;'
    if (align === 'center') styles += 'justify-content: center;'
    if (align === 'bottom') styles += 'justify-content: flex-end;'
    if (align === 'space-between') styles += 'justify-content: space-between;'

    if (styled.length === 0) styles += 'flex: 1;'

    return styles
  }}

  ${({ styles }) => styles}
`

export default Column
