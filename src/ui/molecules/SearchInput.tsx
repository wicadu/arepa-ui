import React, { useCallback, useMemo } from 'react'

import styled from '@emotion/styled'

import Row from '../layout/Row'
import Input from '../atoms/Input'
import Form from '../hocs/Form'

enum LeftIconAction {
  Close = 'close',
  Search = 'search',
  Clear = 'clear',
}

interface Props {
  name: string
  placeholder?: string
  sideUtilityIcon?: React.ReactNode
  min?: number
  leftIcon?: string | undefined
  onLeftIcon?: (action: LeftIconAction) => void
  onFocus: () => void
  onSubmit: (_: string) => void
}

const defaultProps: Partial<Props> = {
  name: '',
  placeholder: '',
  sideUtilityIcon: null,
  min: 1,
  leftIcon: undefined,
  onLeftIcon() {},
}

function SearchInput(props: Props) {
  const {
    name,
    placeholder,
    sideUtilityIcon,
    min,
    leftIcon,
    onLeftIcon,
    onFocus,
    onSubmit,
    ...restOfProps
  } = {
    ...defaultProps,
    ...props,
  }
  const { setValue, control } = Form.useForm()
  const search: string = Form.useWatch({ control, name })

  const hasTyped: boolean = useMemo(() => search?.length >= min, [search, min])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    onSubmit(search)
    e?.currentTarget?.blur?.()
  }

  const onPressIcon = useCallback(() => {
    if (hasTyped) {
      setValue(name, '')
      return
    }

    onLeftIcon?.(hasTyped ? LeftIconAction.Clear : LeftIconAction.Search)
  }, [hasTyped, name, setValue, onLeftIcon])

  return (
    <Container gap={10}>
      <StyledInput
        role="searchbox"
        doNotShowErrors
        name={name}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        icon={{
          position: 'left',
          name: leftIcon ?? (hasTyped ? 'close' : 'search'),
          size: 18,
          onClick: onPressIcon,
        }}
        withBorder={false}
        placeholder={placeholder}
        itemProp="query-input"
        {...restOfProps}
      />

      {React.isValidElement(sideUtilityIcon) &&
        React.cloneElement(sideUtilityIcon, {
          size: 22,
          'data-extra-icon': true,
        } as any)}
    </Container>
  )
}

const Container = styled(Row)`
  margin-left: -10px;
`

const StyledInput = styled(Input)`
  @media screen and (min-width: 768px) {
    input {
      height: 50px;
      font-size: 16px;
    }
  }
`

export default SearchInput
