import React from 'react'

import Form from './Form'
import InputFeedback from './InputFeedback'
import styled from '@emotion/styled'

import { getObjectField } from '../../utils'

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

  const { formState } = Form.useForm()

  const fieldError = getObjectField(formState?.errors, name)
  const flatChildren = React.Children.toArray(children).flat()

  return (
    <Container>
      <StyledInputFeedback
        label={label}
        errors={fieldError}
        hasError={Boolean(fieldError?.message)}
        name={name}
      >
        {flatChildren?.map((child: React.ReactElement, index: number) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                key: child.key || index,
                name,
                ...restOfprops,
              })
            : null
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
