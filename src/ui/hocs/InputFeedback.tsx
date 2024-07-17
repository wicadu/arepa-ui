import React from 'react'
import styled from '@emotion/styled'

interface Props {
  name: string
  label?: string | number
  hasError?: boolean
  children: React.ReactElement | React.ReactElement[]
  doNotShowErrors?: boolean
  labelSize?: number
  errors?: {
    message: string
  }
}

const defaultProps: Partial<Props> = {
  name: '',
  label: '',
  hasError: false,
  children: null,
  doNotShowErrors: false,
  labelSize: 10,
  errors: null
}

function InputFeedback({
  label,
  name,
  hasError,
  errors,
  children,
  doNotShowErrors,
  labelSize,
}: Props) {
  return (
    <Wrapper labelSize={labelSize}>
      {label && <label htmlFor={name}>{label}</label>}
      {children}

      {!doNotShowErrors ? (
        <ErrorMessage hasError={hasError} aria-live='polite'>{errors?.message as any}</ErrorMessage>
      ) : null}
    </Wrapper>
  )
}

export const Wrapper = styled.div<{ labelSize?: number }>`
  display: grid;

  label {
    font-weight: bold;
    ${({ labelSize }: any) => `font-size: ${labelSize}px;`}
  }
`

const ErrorMessage = styled.small<Partial<Props>>`
  color: ${({ theme }: any) => theme.colors.MAIN.ERROR};
  text-align: end;
  padding: 0 5px;
  height: 15px;

  ${({ hasError }) => !hasError && 'opacity: 0;'}
`

InputFeedback.defaultProps = defaultProps

export default InputFeedback
