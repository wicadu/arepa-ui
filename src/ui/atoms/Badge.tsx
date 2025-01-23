import React from 'react'

import styled from '@emotion/styled'
import type { SerializedStyles } from '@emotion/react'

enum BadgeType {
  Primary = 'primary',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Ghost = 'ghost',
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
  wrapperTag?: keyof JSX.IntrinsicElements
}

const defaultProps: Partial<Props> = {
  children: '',
  type: BadgeType.Primary,
  inverse: false,
  color: '',
  width: 'fit-content',
  className: '',
  wrapperTag: 'div',
}

function Badge(props: Props) {
  const {
    children,
    styles,
    width,
    margin,
    padding,
    type,
    inverse,
    className,
    wrapperTag,
    ...restOfProps
  } = { ...defaultProps, ...props }

  return React.createElement(
    Container.withComponent(wrapperTag),
    {
      styles,
      width,
      margin,
      padding,
      type,
      inverse,
      className,
      ...restOfProps,
    },
    children
  )
}

const Container = styled.div<Partial<Props>>`
  border-radius: 5px;
  width: ${({ width }) => width || 'fit-content'};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || '3px 5px'};

  ${({ type, inverse, theme }) => {
    const { colors } = theme

    let styles = `
      font-size: 14px;
      text-align: center;
      font-weight: 700;
    `

    if (type === BadgeType.Ghost) {
      styles += `
        color: ${colors.FONT.DESCRIPTION};
        background-color: ${
          inverse ? colors.NEUTRAL.TRANSPARENT : colors.NEUTRAL.SELECTED
        };
        border: 1px solid ${colors.NEUTRAL.SELECTED};
    `
    } else {
      const mainColor = colors.MAIN?.[String(type).toUpperCase()]

      styles += `
        background-color: ${inverse ? colors.NEUTRAL.TRANSPARENT : mainColor};
        color: ${inverse ? mainColor : colors.FONT.CONTRAST};
        border: 1px solid ${mainColor};
      `
    }

    return styles
  }}

  ${({ styles }) => styles}
`

export default Badge
