import React, { useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import InputFeedback, { Wrapper } from '../hocs/InputFeedback'
import Form from '../hocs/Form'
import { getFormFieldsErrors } from '../../utils'
import { UIElementSizesEnum } from '../ts/enums/UIElementSizesEnum'

const propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  htmlType: PropTypes.string,
  name: PropTypes.string.isRequired,
  doNotShowFeedback: PropTypes.bool,
  size: PropTypes.oneOf<UIElementSizesEnum>(Object.values(UIElementSizesEnum)),
  withBorder: PropTypes.bool,
  styles: PropTypes.string
}

type Props = InferProps<typeof propTypes>

const defaultProps: Props = {
  htmlType: 'text',
  size: UIElementSizesEnum.Large,
  doNotShowFeedback: false,
  withBorder: true,
  styles: ''
}

function InputComponent({
  name,
  htmlType,
  doNotShowFeedback,
  styles,
  ...props
}: Props) {
  const { formState: { errors }, register } = Form.useForm()

  const fieldError = getFormFieldsErrors(errors, name)

  const Container: React.FC<any> = useMemo(
    () => (doNotShowFeedback ? Wrapper : InputFeedback),
    [doNotShowFeedback]
  )

  return (
    <Container
      {...props}
      errors={fieldError}
      hasError={Boolean(fieldError?.message)}
      name={name}
    >
      <Input
        {...props}
        id={name}
        name={name}
        type={htmlType}
        hasError={Boolean(fieldError?.message)}
        styles={styles}
        {...register(name) as const}
      />
    </Container>
  )
}

const Input = styled.input<any>`
  border-radius: 7px;
  padding: 0 15px;
  font-family: "Catamaran", sans-serif;
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
  font-size: 14px;

  background-color: ${({ theme }: any) => theme.colors.NEUTRAL.CARD};
  opacity: ${({ readOnly }: any) => (readOnly ? 0.65 : 1)};

  ${({ disabled }: any) => disabled && 'opacity: 0.7;'}

  border: 1px solid
    ${({ theme, withBorder }: any) =>
    withBorder
      ? theme.colors.NEUTRAL.SELECTED
      : theme.colors.NEUTRAL.TRANSPARENT};

  ${({ theme, hasError }: any) =>
    hasError && `border: 1px solid ${theme.colors.MAIN.ERROR};`}

  ${({ width }: any) => width && `width: ${width};`}

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
  }

  ${({ size }: any) => {
    if (size === UIElementSizesEnum.Small) return 'height: 35px;'

    if (size === UIElementSizesEnum.Medium) return 'height: 42px;'

    if (size === UIElementSizesEnum.Large) return 'height: 50px;'
  }}
`

InputComponent.propTypes = propTypes
InputComponent.defaultProps = defaultProps

export default InputComponent
