import React, { useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Form from '../hocs/Form'

const propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string.isRequired,
  height: PropTypes.number,
  withBorder: PropTypes.bool,
  resize: PropTypes.string
}

type Props = InferProps<typeof propTypes>

const defaultProps = {
  height: 100,
  resize: 'none'
}

function TextareaComponent ({ label, name, ...props }: Props) {
  const { register, formState: { errors } } = Form.useForm()

  const hasError = useMemo(() => !!errors?.[name]?.message, [errors?.[name]?.message])

  return (
    <Wrapper {...props}>
      {label && <label htmlFor={name}>{label}</label>}

      <Textarea
        {...props}
        {...(register(name) as any)}
        id={name}
        name={name}
        hasError={hasError}
      />
      
      {hasError && <ErrorMessage>{String(errors?.[name]?.message)}</ErrorMessage>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;

  label {
    font-weight: 700;
  }
`

const Textarea = styled.textarea<Partial<Props>>`
  border-radius: 10px;
  padding: 15px;
  border: 1px solid ${({ theme, withBorder }) => withBorder ? theme.colors.NEUTRAL.SELECTED : theme.colors.NEUTRAL.TRANSPARENT};
  resize: ${({ resize }) => resize};

    
  ${({ theme, hasError }) => hasError && `border: 1px solid ${theme.colors.MAIN.ERROR};`}

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
  }

  ${({ height }) =>  height && `height: ${height}px;`}

  ${({ error, theme }) => error && `
      border: 1px solid ${theme.colors.error};
      border-radius: 5px;
  `}

`

const ErrorMessage = styled.small`
  & {
    color: ${({ theme }) => theme.colors.MAIN.ERROR};
    text-align: end;
    padding: 0 5px;
  }
`

TextareaComponent.propTypes = propTypes
TextareaComponent.defaultProps = defaultProps

export default TextareaComponent
