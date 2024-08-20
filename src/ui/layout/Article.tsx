import React, { ReactNode, ReactElement } from 'react'
import { SerializedStyles, css } from '@emotion/react'

import Typography from '../atoms/Typography'
import Row from './Row'

import styled from '@emotion/styled'
import { RightChildAsButton } from './Section'

type AfterStyles = {
  content: string
  size: number
  weight: number
  color?: string
}

interface Props {
  children: ReactNode | ReactElement | ReactElement[]
  titleAfterStyles?: AfterStyles
  title: string | ReactElement
  description?: string
  descriptionAfterStyles?: AfterStyles
  rightChild?: string | ReactElement
  className?: string
  styles?: SerializedStyles | string
}

function Article({
  title,
  titleAfterStyles,
  description,
  descriptionAfterStyles,
  rightChild,
  children,
  className,
  styles,
}: Props) {
  return (
    <Container className={className} styles={styles}>
      <div>
        <Row align='space-between' styles={cssHeaderStyles}>
          {typeof title === 'string' ?
            <Typography
              type='title-4'
              lineHeight={30}
              size={16}
              children={title}
              afterStyles={titleAfterStyles}
            />
            : title}
          <div>{rightChild}</div>
        </Row>
        <Typography
          type='description'
          afterStyles={descriptionAfterStyles}
          children={description}
        />
      </div>

      {children}
    </Container>
  )
}

const cssHeaderStyles = css`
  @media screen and (min-width: 768px) {
    h4:first-of-type {
      font-size: 22px;
      line-height: 34px;
    }
  }
`

const Container = styled.section<Partial<Props>>`
  display: flex;
  flex-direction: column;
  ${({ styles }) => styles}
`

Article.RightChildAsButton = RightChildAsButton

export default Article
