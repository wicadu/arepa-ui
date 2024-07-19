import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import { Controller } from 'react-hook-form'
import styled from '@emotion/styled'

import Form from './Form'
import VirtualInputs from '../atoms/VirtualInputs'

const { useForm } = Form

const propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
}

type Props = InferProps<typeof propTypes>

function CheckboxController({
  children,
  name,
  index,
  ...props
}: Props) {
  const { control } = useForm()

  return (
    <Container>
      <VirtualInputs fields={[
        {
          name: `${name}.${index}.value`,
          defaultValue: props.value,
        }
      ]} />
      <Controller
        name={`${name}.${index}.checked`}
        control={control}
        render={({ field: { onChange, value } }) => {
          const handleOnChange = () => {
            if (props.disabled) return

            onChange(!value)
          }

          return (
            <ItemWrapper onClick={handleOnChange}>
              {React.cloneElement(children, { checked: value, ...props })}
            </ItemWrapper>
          )
        }}
        defaultValue={props.checked}
      />
    </Container>
  )
}

const Container = styled.div``

const ItemWrapper = styled.div`
  width: 100%
`

CheckboxController.propTypes = propTypes

export default CheckboxController
