import React, { ReactNode, ReactElement } from 'react'
import { css } from '@emotion/react'

import Typography from '../atoms/Typography'
import Button from '../atoms/Button'
import Row from './Row'

interface Props {
  children: ReactNode | ReactElement | ReactElement[]
  title: string | ReactElement
  description?: string
  rightChild?: string | ReactElement
}

function Section({ title, description, rightChild, children }: Props) {
  return (
    <section>
      <Row align='space-between' styles={sectionTitleStyles}>
        {typeof title === 'string' ?
          <Typography type='title-3' size={16}>{title}</Typography>
          : title}
        <div>{rightChild}</div>
      </Row>
      <Typography type='description'>{description}</Typography>

      {children}
    </section>
  )
}

const sectionTitleStyles = css`
  @media screen and (min-width: 768px) {
    h3 {
      font-size: 30px;
    }

    button {
      font-size: 20px;
    }
  }
`

interface RightChildAsButtonProps {
  onClick: () => void
  text: string
  hide?: boolean
}

function RightChildAsButton({ onClick, text, hide }: RightChildAsButtonProps) {
  if (hide) return

  return <Button type='link' onClick={onClick}>{text}</Button>
}

Section.RightChildAsButton = RightChildAsButton

export default Section
