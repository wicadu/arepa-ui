import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import Form from './Form'
import InputFeedback from './InputFeedback'
import styled from '@emotion/styled'

import { getFormFieldsErrors } from '../../utils'

const { useForm } = Form

const propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
}

type Props = InferProps<typeof propTypes>

function CheckboxGroup ({
  children,
  name,
  label,
  ...props
}: Props) {
  const {
    formState: { errors },
  } = useForm()

  const fieldError = getFormFieldsErrors(errors, name)

  return (
    <Container>
      <StyledInputFeedback
        label={label}
        errors={fieldError}
        hasError={Boolean(fieldError?.message)}
        name={name}
      >
        {
          children.map(child =>
            React.cloneElement(child, {
              name,
              ...props
            })
          )
        }
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

CheckboxGroup.propTypes = propTypes

export default CheckboxGroup
