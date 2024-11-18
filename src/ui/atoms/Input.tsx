import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

import InputFeedback, { Wrapper } from '../hocs/InputFeedback'
import Form from '../hocs/Form'
import Icon, { IconProps } from './Icon'
import { getFormFieldsErrors } from '../../utils'
import { UIElementSizesEnum } from '../ts/enums/UIElementSizesEnum'

type IconPosition = 'left' | 'right'

interface InputIcon extends IconProps {
  position: IconPosition
  component?: React.ReactElement
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
    onClick() { },
    size: 18,
  },
  containerStyles: '',
  width: '100%',
}

function InputComponent(props: Props) {
  const {
    name,
    htmlType,
    doNotShowFeedback,
    styles,
    containerStyles,
    icon,
    ...restOfProps
  } = {
    ...defaultProps,
    ...props
  }

  const { formState: { errors }, register } = Form.useForm()

  const fieldError: any = getFormFieldsErrors(errors, name)

  const Container: React.FC<any> = useMemo(
    () => (doNotShowFeedback ? Wrapper : InputFeedback),
    [doNotShowFeedback]
  )

  const buildIcon: boolean = useMemo(() =>
    icon?.name?.length > 0 || React.isValidElement(icon?.component), [
    icon?.component,
    icon,
  ])

  return (
    <Container
      {...restOfProps}
      errors={fieldError}

      hasError={Boolean(fieldError?.message)}
      name={name}
      styles={containerStyles}
    >
      {buildIcon && (
        <IconContainer position={icon?.position}>
          {React.isValidElement(icon?.component)
            ? icon?.component : <Icon {...icon} />
          }
        </IconContainer>
      )}

      <Input
        {...restOfProps as Record<string, any>}
        id={name}
        buildIcon={buildIcon}
        iconPosition={icon?.position}
        name={name}
        type={htmlType}
        hasError={Boolean(fieldError?.message)}
        styles={styles}
        {...register(name) as const}
      />
    </Container>
  )
}

const Input = styled.input<Partial<Props> & {
  hasError: boolean,
  buildIcon: boolean,
  iconPosition: 'left' | 'right'
}>`
  border-radius: 7px;
  padding: 0 15px;
  font-family: "Catamaran", sans-serif;
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
  font-size: 14px;

  background-color: ${({ theme }) => theme.colors.NEUTRAL.CARD};
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

  ${({ size, buildIcon, iconPosition }) => {
    let styles = ''

    if (size === UIElementSizesEnum.Small) styles += 'height: 40px;'
    if (size === UIElementSizesEnum.Medium) styles += 'height: 45px;'
    if (size === UIElementSizesEnum.Large) styles += 'height: 50px;'

    if (buildIcon) {
      if (iconPosition === 'left') styles += 'padding-left: 35px;'
      if (iconPosition === 'right') styles += 'padding-right: 35px;'
    }

    return styles
  }}


  ${({ styles }) => styles}
`

const IconContainer = styled.div<{
  children: React.ReactElement,
  position: IconPosition
}>`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  ${({ position }) => {
    let styles = ''

    if (position === 'left') styles += 'left: 10px;'
    if (position === 'right') styles += 'right: 10px;'

    return styles
  }}
`

export default InputComponent
