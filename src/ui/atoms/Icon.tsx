import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from '@emotion/styled'

const propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
}

type Props = InferProps<typeof propTypes>

const defaultProps: Props = {
  name: 'question_mark',
  size: 22,
}

function Icon({ className, name, ...props }: Props) {
  return (
    <Container className={`${className} material-icons`} {...props}>{name}</Container>
  )
}

const Container = styled.span`
  ${({ theme, size, color }) => `
    font-size: ${size}px;
    color: ${color || theme.colors.MAIN.PRIMARY}
  `}
`

Icon.defaultProps = defaultProps
Icon.propTypes = propTypes

export default Icon
