import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

const propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  containerStyles: PropTypes.any
}

type Props = InferProps<typeof propTypes>

const defaultProps = {
  value: ''
}

function RadioController({ children, name, value: defaultValue, containerStyles, ...props }: Props) {
  const { control } = useFormContext()

  const formValue = useWatch({
    control,
    name
  })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => {
        const handleOnChange = () => {
          if (props.disabled) return
          onChange(defaultValue)
        }

        return (
          <ItemWrapper onClick={handleOnChange} styles={containerStyles}>
            {React.cloneElement(children, { checked: String(formValue) === String(defaultValue), ...props })}
          </ItemWrapper>
        )
      }}
      defaultValue=''
    />
  )
}

const ItemWrapper = styled.div<{ styles?: SerializedStyles | string }>`
  width: 100%

  ${({ styles }) => styles}
`

RadioController.propTypes = propTypes
RadioController.defaultProps = defaultProps

export default RadioController
