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
      <div>
        <Row align='space-between' styles={sectionTitleStyles}>
          {typeof title === 'string' ?
            <Typography
              type='title-3'
              lineHeight={30}
              size={20}
              children={title}
            />
            : title}
          <div>{rightChild}</div>
        </Row>
        <Typography type='description'>{description}</Typography>
      </div>

      {children}
    </Container>
  )
}

const sectionTitleStyles = css`
  @media screen and (min-width: 768px) {
    h3 {
      font-size: 30px;
      line-height: 40px;
    }

    button {
      font-size: 20px;
    }
  }
`

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    gap: 15px;
  }
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
