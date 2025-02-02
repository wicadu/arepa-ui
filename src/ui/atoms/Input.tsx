import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

import InputFeedback, { Wrapper } from '../hocs/InputFeedback'
import Form from '../hocs/Form'
import Icon, { IconProps } from './Icon'
import { getObjectField } from '../../utils'
import { UIElementSizesEnum } from '../ts/enums/UIElementSizesEnum'

type IconPosition = 'left' | 'right'

interface InputIcon extends IconProps {
  position: IconPosition
  component?: React.ReactElement
  horizontalSpace?: number
}

interface Props {
  label?: string | JSX.Element
  htmlType?: string
  name: string
  doNotShowFeedback?: boolean
  size?: UIElementSizesEnum
  withBorder?: boolean
  width: string
  icon?: InputIcon
  styles?: SerializedStyles | string
  containerStyles?: SerializedStyles | string
  className?: string
}

const defaultProps: Partial<Props> = {
  htmlType: 'text',
  size: UIElementSizesEnum.Medium,
  doNotShowFeedback: false,
  withBorder: true,
  styles: '',
  icon: {
    position: 'left',
    name: '',
    onClick() {},
    size: 18,
    horizontalSpace: 0,
  },
  containerStyles: '',
  width: '100%',
  className: '',
}

function InputComponent(props: Props) {
  const {
    name,
    htmlType,
    doNotShowFeedback,
    styles,
    containerStyles,
    icon,
    className,
    ...restOfProps
  } = {
    ...defaultProps,
    ...props,
  }

  const {
    formState: { errors },
    register,
  } = Form.useForm()

  const fieldError: any = getObjectField(errors, name)

  const Container: React.FC<any> = useMemo(
    () => (doNotShowFeedback ? Wrapper : InputFeedback),
    [doNotShowFeedback]
  )

  const buildIcon: boolean = useMemo(
    () => icon?.name?.length > 0 || React.isValidElement(icon?.component),
    [icon?.component, icon]
  )

  return (
    <Container
      {...restOfProps}
      errors={fieldError}
      hasError={Boolean(fieldError?.message)}
      name={name}
      className={className}
      styles={containerStyles}
    >
      {buildIcon && (
        <IconContainer
          position={icon?.position}
          horizontalSpace={icon?.horizontalSpace}
        >
          {React.isValidElement(icon?.component) ? (
            icon?.component
          ) : (
            <Icon {...icon} />
          )}
        </IconContainer>
      )}

      <Input
        {...(restOfProps as Record<string, any>)}
        id={name}
        buildIcon={buildIcon}
        iconPosition={icon?.position}
        iconHorizontalSpace={icon?.horizontalSpace}
        name={name}
        type={htmlType}
        hasError={Boolean(fieldError?.message)}
        styles={styles}
        {...(register(name) as const)}
      />
    </Container>
  )
}

const Input = styled.input<
  Partial<Props> & {
    hasError: boolean
    buildIcon: boolean
    iconPosition: 'left' | 'right'
  }
>`
  border-radius: 7px;
  padding: 0 12px;
  font-family: 'Catamaran', sans-serif;
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
  font-size: 14px;

  background-color: ${({ theme }) => theme.colors.NEUTRAL.BACKGROUND};
  opacity: ${({ readOnly }) => (readOnly ? 0.65 : 1)};

  ${({ disabled }) => disabled && 'opacity: 0.7;'}

  border: 1px solid
    ${({ theme, withBorder }) =>
    withBorder
      ? theme.colors.NEUTRAL.SELECTED
      : theme.colors.NEUTRAL.TRANSPARENT};

  ${({ theme, hasError }) =>
    hasError && `border: 1px solid ${theme.colors.MAIN.ERROR};`}

  ${({ width }) => width && `width: ${width};`}

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
  }

  ${({ size, buildIcon, iconPosition = 'left', iconHorizontalSpace = 0 }) => {
    let styles = ''

    if (size === UIElementSizesEnum.Small) styles += 'height: 40px;'
    if (size === UIElementSizesEnum.Medium) styles += 'height: 45px;'
    if (size === UIElementSizesEnum.Large) styles += 'height: 50px;'

    if (buildIcon) {
      const totalSpace: number = iconHorizontalSpace + 30

      if (iconPosition === 'left') styles += `padding-left: ${totalSpace}px;`
      if (iconPosition === 'right') styles += `padding-right: ${totalSpace}px;`
    }

    return styles
  }}

  ${({ styles }) => styles}
`

const IconContainer = styled.div<{
  position: IconPosition
  horizontalSpace: number
}>`
  align-items: center;
  display: flex;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${({ position = 'left', horizontalSpace = 0 }) => {
    let styles = ''

    if (position === 'left') styles += `left: ${horizontalSpace}px;`
    if (position === 'right') styles += `right: ${horizontalSpace}px;`

    return styles
  }}
`

export default InputComponent
