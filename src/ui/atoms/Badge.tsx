import React from 'react'

import styled from '@emotion/styled'
import type { SerializedStyles } from '@emotion/react'

enum BadgeType {
  Primary = 'primary',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

interface Props extends Partial<React.HTMLAttributes<HTMLDivElement>> {
  children: string | number
  inverse?: boolean
  type: BadgeType
  color: string
  styles: string | SerializedStyles
  width?: number | string | 'fit-content'
  margin?: string | number
  padding?: string | number
  className?: string
}

const defaultProps: Partial<Props> = {
  children: '',
  type: BadgeType.Primary,
  inverse: false,
  color: '',
  width: 'fit-content',
  className: '',
}

function Badge(props: Props) {
  const { children, styles, width, margin, padding, type, inverse, className } =
    {
      ...defaultProps,
      ...props,
    }

  return (
    <Container
      styles={styles}
      width={width}
      margin={margin}
      padding={padding}
      type={type}
      inverse={inverse}
      className={className}
    >
      {children}
    </Container>
  )
}

const Container = styled.div<Partial<Props>>`
  border-radius: 5px;
  width: ${({ width }) => width || 'fit-content'};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || '3px 5px'};

  ${({ type, inverse, theme }) => {
    const { colors } = theme

    const mainColor = colors.MAIN?.[String(type).toUpperCase()]

    return `
      background-color: ${inverse ? colors.NEUTRAL.TRANSPARENT : mainColor};
      color: ${inverse ? mainColor : colors.FONT.CONTRAST};
      border: 1px solid ${mainColor};

      font-size: 14px;
      text-align: center;
      ${inverse ? `font-weight: 700;` : ''}
    `
  }}

  ${({ styles }) => styles}
`

export default Badge
