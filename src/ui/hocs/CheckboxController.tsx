import React, { useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import { Controller } from 'react-hook-form'
import styled from '@emotion/styled'

import Form from './Form'

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

function CheckboxController ({
  children,
  name,
  index,
  ...props
}: Props) {
  const {
    control,
    register,
    setValue,
  } = useForm()

  useEffect(() => {
    register(`${name}[${index}].value`)
    setValue(`${name}[${index}].value`, props.value)
  }, [])

  return (
    <Controller
      name={`${name}[${index}].checked`}
      control={control}
      render={({
        onChange,
        value
      }) => {
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
  )
}

const ItemWrapper = styled.div`
  width: 100%
`

CheckboxController.propTypes = propTypes

export default CheckboxController
