import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

enum badgeType {
  primary = 'primary',
  success = 'success',
  error = 'error',
  warning = 'warning',
}

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  inverse: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(badgeType)),
  color: PropTypes.string,
}

const defaultProps = {
  children: null,
  type: badgeType.primary,
  inverse: false,
  color: '',
}

type Props = InferProps<typeof propTypes>

function Badge({ children, ...props }: Props) {
  return <Container {...props}>{children}</Container>
}

const Container = styled.div`
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
      ${inverse && `font-weight: 700;`}
    `
  }}
`

Badge.propTypes = propTypes
Badge.defaultProps = defaultProps

export default Badge
