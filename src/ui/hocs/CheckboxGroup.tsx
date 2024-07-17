import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

const propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
}

type Props = InferProps<typeof propTypes>

function CheckboxGroup ({
  children,
  name,
  label,
  ...props
}: Props) {
  return (
    <Container>
      {label && (
        <Label>{label}</Label>
      )}
      {
        children.map(child =>
          React.cloneElement(child, {
            name,
            ...props
          })
        )
      }
    </Container>
  )
}

const Container = styled.div``

const Label = styled.div`
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 5px;
`

CheckboxGroup.propTypes = propTypes

export default CheckboxGroup
