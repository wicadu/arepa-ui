import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

import InputFeedback, { Wrapper } from '../hocs/InputFeedback'
import Form from '../hocs/Form'
import Icon, { IconProps } from './Icon'
import { getFormFieldsErrors } from '../../utils'
import { UIElementSizesEnum } from '../ts/enums/UIElementSizesEnum'

interface Props {
  label?: string | JSX.Element
  htmlType?: string
  name: string
  doNotShowFeedback?: boolean
  size?: UIElementSizesEnum
  withBorder?: boolean
  width: string
  leftIcon?: IconProps
  styles?: SerializedStyles | string
  containerStyles?: SerializedStyles | string
}

const defaultProps: Partial<Props> = {
  htmlType: 'text',
  size: UIElementSizesEnum.Medium,
  doNotShowFeedback: false,
  withBorder: true,
  styles: '',
  leftIcon: {
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
    leftIcon,
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

  const bLeftIcon: boolean = useMemo(() => leftIcon?.name?.length > 0, [
    leftIcon
  ])

  return (
    <Container
      {...restOfProps}
      errors={fieldError}
      hasError={Boolean(fieldError?.message)}
      name={name}
      styles={containerStyles}
    >
      {bLeftIcon && <LeftIconStyled {...leftIcon} />}

      <Input
        {...restOfProps as Record<string, any>}
        id={name}
        bLeftIcon={bLeftIcon}
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
  bLeftIcon: boolean
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

  ${({ size }) => {
    if (size === UIElementSizesEnum.Small) return 'height: 40px;'
    if (size === UIElementSizesEnum.Medium) return 'height: 45px;'
    if (size === UIElementSizesEnum.Large) return 'height: 50px;'
  }}

  ${({ bLeftIcon }) => bLeftIcon ? 'padding-left: 35px;' : ''}

  ${({ styles }) => styles}
`

const LeftIconStyled = styled(Icon)<any>`
  position: absolute;
  top: 48%;
  transform: translate(0, -50%);
  left: 10px;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
`

export default InputComponent
