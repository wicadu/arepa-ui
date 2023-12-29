import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from '@emotion/styled'

const propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

type Props = InferProps<typeof propTypes>

const defaultProps: Props = {
  className: 'question_mark',
  size: 22,
}

function Icon({ className, name, size, color, onClick }: Props) {
  return (
    <Container
      className={`${className} material-icons`}
      size={size}
      color={color}
      onClick={onClick}
    >
      {name}
    </Container>
  )
}

const Container = styled.span<Props>`
  ${({ theme, size, color }) => `
    font-size: ${size}px;
    color: ${color || theme.colors.MAIN.PRIMARY}
  `}
`

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps

export default Icon
