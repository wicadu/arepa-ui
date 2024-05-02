import React, { useCallback, useMemo, useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import Spin from './Spin'

const propTypes = {
  onClick: PropTypes.func,
  defaultValue: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  controlled: PropTypes.bool,
  loading: PropTypes.bool
}

type Props = InferProps<typeof propTypes>

const defaultProps: Props = {
  onClick: null,
  defaultValue: false,
  disabled: false,
  controlled: false,
  loading: false
}

function Toggle ({ defaultValue, disabled, onClick, controlled, loading }: Props) {
  const [active, setActive] = useState<boolean>(defaultValue)

  const { colors } = useTheme()

  const value: boolean = useMemo(() => controlled ? defaultValue : active, [
    active,
    defaultValue,
    controlled
  ])

  const handleToggle = useCallback(() => {
    if (disabled) return

    setActive(!value)
    onClick?.(!value)
  }, [onClick, disabled, value])

  if (loading) return <Spin color={colors.MAIN.PRIMARY} size={20} />

  return (
    <Container onClick={handleToggle} active={value} disabled={disabled}>
      <Circle />
    </Container>
  )
}

type StylesTypes = {
  active: boolean
  disabled: boolean
  theme?: any
}


const Container = styled.div`
  & {
    height: 22px;
    width: 40px;
    border-radius: 15px;
    align-content: center;
    display: flex;
    cursor: pointer;
    opacity: ${({ disabled }: StylesTypes) => disabled ? 0.65 : 1};

    ${({ theme, active }: StylesTypes) => active ? `
      justify-content: flex-end;
      background-color: ${theme.colors.MAIN.PRIMARY};
    ` : `
      justify-content: flex-start;
      background-color: ${theme.colors.NEUTRAL.SELECTED};
    `}
  }
`
const Circle = styled.div`
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50px;
  align-self: center;
  margin: 0 2px;
`

Toggle.propTypes = propTypes
Toggle.defaultProps = defaultProps

export default Toggle
