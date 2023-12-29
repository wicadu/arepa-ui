import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Form from './Form'

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasError: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
  doNotShowErrors: PropTypes.bool
}

type Props = InferProps<typeof propTypes>

function InputFeedback({ label, name, hasError, children, doNotShowErrors, ...props }: Props) {
  const { formState: { errors } } = Form.useForm()

  return (
    <Wrapper {...props}>
      {label && <label htmlFor={name}>{label}</label>}
      {children}

      {!doNotShowErrors ? (
        <ErrorMessage hasError={hasError}>{errors?.[name]?.message}</ErrorMessage>
      ) : null}
    </Wrapper>
  )
}

export const Wrapper = styled.div<any>`
  display: grid;

  label {
    font-weight: 700;
    ${({ labelSize }: any) => `font-size: ${labelSize || 12}px;`}
  }
`

const ErrorMessage = styled.small<any>`
  color: ${({ theme }: any) => theme.colors.MAIN.ERROR};
  text-align: end;
  padding: 0 5px;
  height: 25px;

  ${({ hasError }) => !hasError && 'opacity: 0;'}
`

InputFeedback.propTypes = propTypes

export default InputFeedback
