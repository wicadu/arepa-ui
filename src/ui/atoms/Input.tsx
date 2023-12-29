import React, { useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import InputFeedback, { Wrapper } from '../hocs/InputFeedback'
import Form from '../hocs/Form'
import { InputSizesEnum } from '../ts/enums/InputSizesEnum'

const propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  htmlType: PropTypes.string,
  name: PropTypes.string.isRequired,
  doNotShowFeedback: PropTypes.bool,
  size: PropTypes.oneOf<InputSizesEnum>(Object.values(InputSizesEnum)),
  withBorder: PropTypes.bool,
}

type Props = InferProps<typeof propTypes>

const defaultProps: Props = {
  htmlType: 'text',
  size: InputSizesEnum.large,
  doNotShowFeedback: false,
}

function InputComponent({
  name,
  htmlType,
  doNotShowFeedback,
  ...props
}: Props) {
  const { formState: { errors }, register } = Form.useForm()

  const hasError = useMemo(() => !!errors?.[name]?.message, [errors?.[name]])

  const Container: React.FC<any> = useMemo(
    () => (doNotShowFeedback ? Wrapper : InputFeedback),
    [doNotShowFeedback]
  )

  return (
    <Container {...props} hasError={hasError} name={name}>
      <Input
        {...props}
        id={name}
        name={name}
        type={htmlType}
        hasError={hasError}
        {...register(name) as any}
      />
    </Container>
  )
}

const Input = styled.input<any>`
  border-radius: 10px;
  padding: 0 15px;

  background-color: ${({ theme }: any) => theme.colors.NEUTRAL.CARD};
  opacity: ${({ readOnly }: any) => (readOnly ? 0.65 : 1)};

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
    if (size === InputSizesEnum.small) return 'height: 35px;'

    if (size === InputSizesEnum.medium) return 'height: 42px;'

    if (size === InputSizesEnum.large) return 'height: 50px;'
  }}
`

InputComponent.propTypes = propTypes
InputComponent.defaultProps = defaultProps

export default InputComponent
