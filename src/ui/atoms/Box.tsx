import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from '@emotion/styled'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  withBorders: PropTypes.bool
}

const defaultProps = {
  children: null,
  withBorders: false
}

type Props = InferProps<typeof propTypes>

function Box ({ children, ...props }: Props) {
  return <Container {...props}>{children}</Container>
}

const Container = styled.article`
  padding: 15px;
  border-radius: 10px;
  background-color:  ${({ theme }) => theme.colors.NEUTRAL.CARD};

  ${({ withBorders, theme }) => withBorders && `border: 1px solid ${theme.colors.NEUTRAL.SELECTED}`};
  ${({ extraStyles }) => extraStyles}

  @media screen and (max-width: 468px) {
    padding: 10px;
  }
`

Box.propTypes = propTypes
Box.defaultProps = defaultProps

export default Box
