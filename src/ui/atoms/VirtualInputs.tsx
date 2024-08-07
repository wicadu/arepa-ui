import React from 'react'

import Form from '../hocs/Form'

import styled from '@emotion/styled'

const { useForm } = Form

type Field = {
  name: string
  defaultValue?: any
}

interface Props {
  fields: Field[]
}

function VirtualInputs({ fields }: Props) {
  const { register } = useForm()

  return (
    <Container disabled>
      {fields.map(({ name, defaultValue }, index) => (
        <input key={`${name}-${index}`} defaultValue={defaultValue} {...register(name)} />
      ))}
    </Container>
  )
}

const Container = styled.fieldset`
  display: none;
`

export default VirtualInputs
