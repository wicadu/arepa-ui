import React from 'react'

import Form from './Form'
import InputFeedback from './InputFeedback'
import styled from '@emotion/styled'

import { getObjectField } from '../../utils'

const { useForm } = Form

interface Props {
  children: React.ReactNode
  name: string
  label?: string
}

const defaultProps: Props = {
  children: null,
  name: '',
  label: '',
}

function CheckboxGroup(props: Props) {
  const { children, name, label, ...restOfprops } = {
    ...defaultProps,
    ...props,
  }

  const { formState } = useForm()

  const fieldError = getObjectField(formState?.errors, name)

  return (
    <Container>
      <StyledInputFeedback
        label={label}
        errors={fieldError}
        hasError={Boolean(fieldError?.message)}
        name={name}
      >
        {children.map((child) =>
          React.cloneElement(child, {
            name,
            ...restOfprops,
          })
        )}
      </StyledInputFeedback>
    </Container>
  )
}

const Container = styled.div``

const StyledInputFeedback = styled(InputFeedback)`
  & > label {
    font-size: 10px;
    font-weight: bold;
    margin-bottom: 5px;
  }
`

export default CheckboxGroup
