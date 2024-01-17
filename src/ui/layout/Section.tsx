import React, { ReactNode, ReactElement } from 'react'

import Typography from '../atoms/Typography'
import Row from './Row'

interface Props {
  children: ReactNode | ReactElement | ReactElement[]
  title: string
  description?: string
  rightChild?: string | ReactElement
}

function Section({
  title,
  description,
  rightChild,
  children
}: Props): JSX.Element {
  return (
    <section>
      <Row align='space-between'>
        <Typography type='title-3' size={16}>{title}</Typography>
        <div>{rightChild}</div>
      </Row>
      <Typography type='description'>{description}</Typography>

      {children}
    </section>
  )
}

export default Section
