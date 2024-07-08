import React from 'react'

import styled from '@emotion/styled'

import Spin from './Spin'
import getBordersStyles, { BorderTypes } from '../../utils/getBordersStyles'

enum HtmlType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

enum ButtonType {
  primary = 'primary',
  success = 'success',
  error = 'error',
  warning = 'warning',
  ghost = 'ghost',
  white = 'white',
  link = 'link',
}

enum ButtonSizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}


interface Props {
  children: React.ReactNode
  onClick?: () => void
  htmlType?: HtmlType
  type?: ButtonType
  size?: ButtonSizes
  disabled?: boolean
  outlined?: boolean | BorderTypes
  loading?: boolean
  width?: string
  margin?: string
}

const defaultProps: Partial<Props> = {
  type: ButtonType.primary,
  size: ButtonSizes.medium,
  htmlType: HtmlType.button,
  onClick() { },
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
      {loading ? (
        <Spin
          type={[ButtonType.white, ButtonType.link].includes(type) || outlined ? type : ButtonType.white}
          size={20}
        />
      )
        : children}
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

    margin: ${({ margin = '0px' }) => margin};
    ${({ width }) => width && `width: ${width};`}

    ${({ size }) => {
    if (size === ButtonSizes.small)
      return `
        height: 35px;
        font-size: 12px;
        border-radius: 7px;

        @media screen and (min-width: 768px) {
          font-size: 14px;
        }
      `

    if (size === ButtonSizes.medium)
      return `
        height: 44px;
        font-size: 14px;
        border-radius: 7px;

        @media screen and (min-width: 768px) {
          font-size: 16px;
        }
      `

    if (size === ButtonSizes.large)
      return `
        height: 50px;
        font-size: 18px;

        @media screen and (min-width: 768px) {
          font-size: 20px;
        }
      `
  }}

    ${({ type, outlined, theme, margin = '5px 0' }) => {
    const { colors } = theme

    let style: string = ''

    if (type === ButtonType.link) {
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

    if (type === ButtonType.ghost) {
      style += `
        color: ${colors.FONT.HELPER};      
        background-color: ${outlined ? colors.NEUTRAL.TRANSPARENT : colors.NEUTRAL.SELECTED};
        ${getBordersStyles(1, outlined, colors.NEUTRAL.SELECTED)}
      `

      return style
    }

    if (type === ButtonType.white) {
      style += `
          background-color: ${colors.NEUTRAL.CARD};
          color: ${colors.FONT.TITLE};
          font-weight: 700;
          ${getBordersStyles(1, outlined, colors.NEUTRAL.SELECTED)}
        `

      return style
    }

    const mainColor = colors.MAIN?.[String(type).toUpperCase()]

    style += `
        background-color: ${outlined ? colors.NEUTRAL.TRANSPARENT : mainColor};
        color: ${outlined ? mainColor : colors.NEUTRAL.BACKGROUND};
        ${getBordersStyles(1, outlined, mainColor)}
      `

    return style
  }}

    ${({ disabled, type, theme }) => {
    const { colors } = theme

    if (disabled && type === ButtonType.link) {
      return `
        color: ${colors.darkGray};
      `
    }

    if (disabled) return `opacity: 0.85;`
  }}
  }
`

WrapperButton.defaultProps = defaultProps

Button.htmlType = HtmlType
Button.buttonType = ButtonType
Button.buttonSizes = ButtonSizes

export default WrapperButton
