import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
}

type Props = InferProps<typeof propTypes>

function CheckboxGroup ({
  children,
  name,
  ...props
}: Props) {
  return children.map(child =>
    React.cloneElement(child, {
      name,
      ...props
    })
  )
}

CheckboxGroup.propTypes = propTypes

export default CheckboxGroup
