import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import styled from '@emotion/styled'

const propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

type Props = InferProps<typeof propTypes>

const defaultProps = {
  value: ''
}

function RadioController ({ children, name, value: defaultValue, ...props }: Props) {
  const { control } = useFormContext()

  const formValue = useWatch({
    control,
    name
  })

  return (
      <Controller
        name={name}
        control={control}
        render={({ onChange }) => {
          const handleOnChange = () => {
            if (props.disabled) return
            onChange(defaultValue)
          }
  
          return (
            <ItemWrapper onClick={handleOnChange}>
              {React.cloneElement(children, { checked: formValue === defaultValue, ...props })}
            </ItemWrapper>
          )
        }}
        defaultValue=''
      />
  )
}

const ItemWrapper = styled.div`
  width: 100%
`

RadioController.propTypes = propTypes
RadioController.defaultProps = defaultProps

export default RadioController
