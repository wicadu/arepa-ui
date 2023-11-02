import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Form from './Form'

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasError: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
}

type Props = InferProps<typeof propTypes>

function InputFeedback({ label, name, hasError, children, ...props }: Props) {
  const { errors } = Form.useForm()

  return (
    <Wrapper {...props}>
      {label && <label htmlFor={name}>{label}</label>}
      {children}
      <ErrorMessage hasError={hasError}>{errors[name]?.message}</ErrorMessage>
    </Wrapper>
  )
}

const Wrapper = styled.div<any>`
  display: grid;
  min-height: 85px;

  label {
    font-weight: 700;
    ${({ labelSize }: any) => `font-size: ${labelSize || 12}px;`}
  }
`

const ErrorMessage = styled.small<any>`
  color: ${({ theme }: any) => theme.colors.MAIN.ERROR};
  text-align: end;
  padding: 0 5px;

  ${({ hasError }) => !hasError && 'opacity: 0;'}
`

InputFeedback.propTypes = propTypes

export default InputFeedback
