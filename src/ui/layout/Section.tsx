import React, { ReactNode, ReactElement } from 'react'
import { css } from '@emotion/react'

import Typography from '../atoms/Typography'
import Button from '../atoms/Button'
import Row from './Row'

import styled from '@emotion/styled'

interface Props {
  children: ReactNode | ReactElement | ReactElement[]
  title: string | ReactElement
  description?: string
  rightChild?: string | ReactElement
  className?: string
}

function Section({ title, description, rightChild, children, className }: Props) {
  return (
    <Container className={className}>
      <Header>
        <Row align='space-between' styles={sectionTitleStyles}>
          {typeof title === 'string' ?
            <Typography type='title-3' size={16}>{title}</Typography>
            : title}
          <div>{rightChild}</div>
        </Row>
        <Typography type='description'>{description}</Typography>
      </Header>

      {children}
    </Container>
  )
}

const sectionTitleStyles = css`
  @media screen and (min-width: 768px) {
    h3 {
      font-size: 22px;
      line-height: 34px;
    }

    button {
      font-size: 20px;
    }
  }
`

const Container = styled.section``

const Header = styled.div`
  margin-bottom: 10px;
`

interface RightChildAsButtonProps {
  onClick: () => void
  text: string
  hide?: boolean
}

function RightChildAsButton({ onClick, text, hide }: RightChildAsButtonProps) {
  if (hide) return

  return (
    <RightChildButton
      type='link'
      onClick={onClick}
      highlight={false}
      children={text}
    />
  )
}

const RightChildButton = styled(Button)`
  @media screen and (min-width: 768px) {
    font-size: 12px !important;
  }
`

Section.RightChildAsButton = RightChildAsButton

export default Section
