import React from 'react'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

interface Props {
  name: string
  label?: string | number
  hasError?: boolean
  children: React.ReactElement | React.ReactElement[]
  doNotShowErrors?: boolean
  labelSize?: number
  width?: string
  errors?: {
    message: string
  }
  className?: string
  styles?: SerializedStyles | string
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

function InputFeedback(props: Props) {
  const {
    label,
    name,
    hasError,
    errors,
    children,
    doNotShowErrors,
    labelSize,
    width,
    className,
    styles,
  } = {
    ...defaultProps,
    ...props
  }

  return (
    <Wrapper labelSize={labelSize} className={className} width={width} styles={styles}>
      {label && <Label htmlFor={name}>{label}</Label>}
      {children}

      {!doNotShowErrors ? (
        <ErrorMessage hasError={hasError} aria-live='polite'>{errors?.message as any}</ErrorMessage>
      ) : null}
    </Wrapper>
  )
}

export const Wrapper = styled.div<{
  labelSize?: number,
  width: string,
  styles?: SerializedStyles | string
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};


  label {
    font-weight: bold;
    ${({ labelSize }: any) => `font-size: ${labelSize}px;`}
  }

  ${({ styles }) => styles}
`

const Label = styled.label``

const ErrorMessage = styled.span<Partial<Props>>`
  color: ${({ theme }: any) => theme.colors.MAIN.ERROR};
  text-align: end;
  padding: 0 5px;
  height: 15px;
  font-size: 10px;

  ${({ hasError }) => !hasError && 'opacity: 0;'}
`

export default InputFeedback
