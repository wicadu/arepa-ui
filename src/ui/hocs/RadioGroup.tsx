import React, { ReactNode, ReactElement } from 'react'

interface Props {
  children: ReactNode
  name: string
}

function RadioGroup({ children, name, ...props }: Props) {
  const flatChildren = React.Children.toArray(children).flat()

  return flatChildren?.map((child: ReactElement, index: number) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          key: child.key || index,
          name,
          ...props,
        })
      : null
  )
}

export default RadioGroup
