import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import Icon from './Icon'
import CheckboxGroup from '../hocs/CheckboxGroup'
import CheckboxController from '../hocs/CheckboxController'

enum checkboxType {
  primary = 'primary',
  success = 'success',
  error = 'error',
  warning = 'warning',
  ghost = 'ghost',
}

const propTypes = {
  type: PropTypes.oneOf(Object.values(checkboxType)),
  size: PropTypes.number,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

const defaultProps = {
  type: checkboxType.primary,
  size: 22,
}

type Props = InferProps<typeof propTypes>

function Checkbox(props: Props) {
  const { size, checked } = props

  const { colors } = useTheme()

  return (
    <Container {...props}>
      {checked && (
        <Icon
          name="check"
          size={size - 8}
          color={colors.FONT.CONTRAST}
        />
      )}
    </Container>
  )
}

const Container = styled.div<Props>`
  border-radius: 5px;
  overflow: hidden;
  border-width: 1.5px;
  display: grid;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;

  i {
    cursor: pointer;
  }

  ${({ disabled }) => (disabled ? 'opacity: 0.5;' : '')}

  ${({ type, theme, checked }) => {
    const { colors } = theme

    if (type === checkboxType.ghost) {
      if (checked) {
        return `
          background: ${colors.NEUTRAL.SELECTED};
          border: 1px solid ${colors.NEUTRAL.SELECTED};
        `
      }

      return `
        background: ${colors.FONT.CONTRAST};
        border: 1px solid ${colors.NEUTRAL.SELECTED};
      `
    }

    const mainColor = colors.MAIN?.[String(type).toUpperCase()]

    if (checked) {
      return `
        background: ${mainColor};
        border: 1px solid ${mainColor};
      `
    }

    return `
      background: ${colors.FONT.CONTRAST};
      border: 1px solid ${mainColor};
    `
  }}
`

Checkbox.propTypes = propTypes
Checkbox.defaultProps = defaultProps

Checkbox.Group = CheckboxGroup
Checkbox.Controller = CheckboxController

export default Checkbox
