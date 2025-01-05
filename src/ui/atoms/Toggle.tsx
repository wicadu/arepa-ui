import React, { useMemo, useState } from 'react'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import Spin from './Spin'

interface Props {
  defaultValue?: boolean
  disabled?: boolean
  controlled?: boolean
  loading?: boolean
  onClick?: (value: boolean) => void
}

const defaultProps: Partial<Props> = {
  defaultValue: false,
  disabled: false,
  controlled: false,
  loading: false,
  onClick(_: boolean) {},
}

function Toggle(props: Props) {
  const { defaultValue, disabled, onClick, controlled, loading } = {
    ...defaultProps,
    ...props,
  }

  const [active, setActive] = useState<boolean>(defaultValue)

  const { colors } = useTheme()

  const value: boolean = useMemo(
    () => (controlled ? defaultValue : active),
    [active, defaultValue, controlled]
  )

  const onChange = () => {
    if (disabled) return

    setActive(!value)
    onClick?.(!value)
  }

  if (loading) return <Spin color={colors.MAIN.PRIMARY} size={20} />

  return (
    <Container onClick={onChange} active={value} disabled={disabled}>
      <Circle />
    </Container>
  )
}

const Container = styled.div<Partial<Props>>`
  & {
    height: 20px;
    width: 40px;
    border-radius: 20px;
    align-content: center;
    display: flex;
    cursor: pointer;
    opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};
    padding: 0 5px;

    ${({ theme, active }) =>
      active
        ? `
      justify-content: flex-end;
      background-color: ${theme.colors.MAIN.PRIMARY};
    `
        : `
      justify-content: flex-start;
      background-color: ${theme.colors.FONT.DESCRIPTION};
    `}
  }
`
const Circle = styled.div`
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 12px;
  align-self: center;
`

export default Toggle
