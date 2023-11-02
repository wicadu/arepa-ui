import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import RadioGroup from '../hocs/RadioGroup'
import RadioController from '../hocs/RadioController'

const propTypes = {
  size: PropTypes.number,
  checked: PropTypes.bool,
}

const defaultProps = {
  type: 'primary',
  size: 22
}

type Props = InferProps<typeof propTypes>

function Radio (props: Props) {
  return <RadioContainer {...props} />
}

const RadioContainer = styled.div<Props>`
  border-radius: ${({ size }) => size}px;
  overflow: hidden;
  border-width: 1.5px;
  display: grid;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background: ${({ theme, checked }) => checked ? theme.colors.MAIN.PRIMARY : theme.colors.FONT.CONTRAST};
  border: 1px solid ${({ theme }) => theme.colors.MAIN.PRIMARY};
`

Radio.propTypes = propTypes
Radio.defaultProps = defaultProps

Radio.Group = RadioGroup
Radio.Controller = RadioController

export default Radio
