import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Spin from './Spin'

enum htmlType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

enum buttonType {
  primary = 'primary',
  success = 'success',
  error = 'error',
  warning = 'warning',
  ghost = 'ghost',
  white = 'white',
  link = 'link',
}

enum buttonSizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  htmlType: PropTypes.oneOf(Object.values(htmlType)),
  type: PropTypes.oneOf(Object.values(buttonType)),
  size: PropTypes.oneOf(Object.values(buttonSizes)),
  disabled: PropTypes.bool,
  outlined: PropTypes.bool,
  loading: PropTypes.bool,
  width: PropTypes.string,
  margin: PropTypes.string,
}

type Props = InferProps<typeof propTypes>

const defaultProps: Props = {
  type: buttonType.primary,
  size: buttonSizes.small,
  htmlType: htmlType.button,
  onClick() {},
  loading: false,
}

function Button({
  children,
  htmlType,
  disabled,
  outlined,
  type,
  loading,
  ...restOfProps
}: Props) {
  return (
    <button {...restOfProps} type={htmlType} disabled={disabled || loading}>
      {loading ? <Spin type={type} size={20} /> : children}
    </button>
  )
}

const WrapperButton = styled(Button)`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    font-weight: bold;

    margin: ${({ margin = '0 2px' }) => margin};
    ${({ width }) => width && `width: ${width};`}

    ${({ size }) => {
      if (size === buttonSizes.small)
        return `
        height: 35px;
        font-size: 12px;
      `

      if (size === buttonSizes.medium)
        return `
        height: 44px;
        font-size: 14px;
        border-radius: 7px;
      `

      if (size === buttonSizes.large)
        return `
        height: 50px;
        font-size: 18px;
      `
    }}

    ${({ type, outlined, theme, margin = '5px 0' }) => {
      const { colors } = theme

      let style: string = ''

      if (type === buttonType.link) {
        style += `
          color: ${colors.MAIN.PRIMARY};
          background-color: ${colors.NEUTRAL.TRANSPARENT};
          font-weight: bold;
          padding: 0px;
          height: auto;
          margin: ${margin};
        `

        return style
      }

      if (type === buttonType.ghost) {
        style += `
          background-color: ${colors.NEUTRAL.SELECTED};
          color: ${colors.FONT.HELPER};
        `

        return style
      }

      if (type === buttonType.white) {
        style += `
          background-color: ${colors.NEUTRAL.CARD};
          color: ${colors.FONT.TITLE};
          font-weight: 700;
          border: 1px solid ${colors.NEUTRAL.SELECTED};
        `

        return style
      }

      const mainColor = colors.MAIN?.[String(type).toUpperCase()]

      style += `
        background-color: ${outlined ? colors.NEUTRAL.TRANSPARENT : mainColor};
        color: ${outlined ? mainColor : colors.NEUTRAL.BACKGROUND};
        border: 1px solid ${mainColor};
      `

      return style
    }}

    ${({ disabled, type, theme }) => {
      const { colors } = theme

      if (disabled && type === buttonType.link) {
        return `
          color: ${colors.darkGray};
        `
      }

      if (disabled) return `opacity: 0.85;`
    }}
  }
`

Button.propTypes = propTypes
WrapperButton.defaultProps = defaultProps

Button.htmlType = htmlType

export default WrapperButton
