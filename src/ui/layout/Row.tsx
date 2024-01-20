import React from 'react'
import styled from '@emotion/styled'

type ItemsAlign = 'left' | 'center' | 'right' | 'space-between'

interface Props {
  children: React.ReactNode
  align?: ItemsAlign
  gap: number
}

const defaultProps: Props = {
  children: 'div',
  gap: 0
}

function Row({ children, align, gap }: Props) {
  return (
    <Container align={align} gap={gap}>{children}</Container>
  )
}

const Container = styled.div<Partial<Props>>`
  display: flex;
  align-items: center;

  ${({ gap }) => gap ? `gap: ${gap}px;` : ''}

  ${({ align }) => {
    let styles: string = ''

    if (align === 'left') styles += 'justify-content: flex-start;'
    if (align === 'center') styles += 'justify-content: center;'
    if (align === 'right') styles += 'justify-content: flex-end;'
    if (align === 'space-between') styles += 'justify-content: space-between;'

    if (styled.length === 0) styles += 'flex: 1;'

    return styles
  }}
`



Row.defaultProps = defaultProps

export default Row
