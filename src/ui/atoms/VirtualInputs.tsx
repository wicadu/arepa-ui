import React from 'react'

import Form from '../hocs/Form'

import styled from '@emotion/styled'

const { useForm } = Form

interface Props {
  fields: {
    name: string;
    defaultValue?: any;
  }[];
}

function VirtualInputs ({ fields }: Props) {
  const { register } = useForm()

  return (
    <Container disabled>
      {fields.map(({ name, defaultValue }) => <input defaultValue={defaultValue} {...register(name) as const} />)}
    </Container>
  )
}

const Container = styled.fieldset`
  display: none;
`

export default VirtualInputs
