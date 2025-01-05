import React from 'react'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

interface Props {
  children: React.ReactNode
  name: string
  value: string | number
  disabled?: boolean
  containerStyles?: SerializedStyles | string
}

const defaultProps: Partial<Props> = {
  value: '',
}

function RadioController(props: Props) {
  const {
    children,
    name,
    value: defaultValue,
    containerStyles,
    ...restOfProps
  } = {
    ...defaultProps,
    ...props,
  }

  const { control } = useFormContext()

  const formValue = useWatch({
    control,
    name,
  })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => {
        const handleOnChange = () => {
          if (restOfProps.disabled) return
          onChange(defaultValue)
        }

        return (
          <ItemWrapper onClick={handleOnChange} styles={containerStyles}>
            {React.cloneElement(children, {
              checked: String(formValue) === String(defaultValue),
              ...restOfProps,
            })}
          </ItemWrapper>
        )
      }}
      defaultValue=""
    />
  )
}

const ItemWrapper = styled.div<{ styles?: SerializedStyles | string }>`
  width: 100% ${({ styles }) => styles};
`

export default RadioController
