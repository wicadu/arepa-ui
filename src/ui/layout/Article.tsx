import React, { ReactNode, ReactElement } from 'react'
import { SerializedStyles, css, useTheme } from '@emotion/react'

import Typography from '../atoms/Typography'
import Row from './Row'

import styled from '@emotion/styled'
import { RightChildAsButton } from './Section'
import Icon from '../atoms/Icon'

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
  iconName?: string
  description?: string
  descriptionAfterStyles?: AfterStyles
  rightChild?: string | ReactElement
  className?: string
  styles?: SerializedStyles | string
}

function Article({
  title,
  iconName,
  titleAfterStyles,
  description,
  descriptionAfterStyles,
  rightChild,
  children,
  className,
  styles,
}: Props) {
  const { colors } = useTheme()
  return (
    <Container className={className} styles={styles}>
      <header>
        <Row align="space-between" styles={cssHeaderStyles}>
          <Row gap={10}>
            <Icon
              name={iconName}
              color={colors?.FONT?.TITLE}
              size={15}
              datasets={{
                'data-title-icon': true,
                'data-title-icon-display': Boolean(iconName),
              }}
            />
            <Typography
              type="title-4"
              lineHeight={30}
              size={16}
              children={title}
              data-title
              afterStyles={titleAfterStyles}
            />
          </Row>

          {rightChild}
        </Row>
        {Boolean(description?.length) && (
          <Typography
            type="description"
            size={12}
            afterStyles={descriptionAfterStyles}
            children={description}
          />
        )}
      </header>

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

const Container = styled.article<Partial<Props>>`
  display: flex;
  flex-direction: column;
  ${({ styles }) => styles}

  [data-title-icon-display='false'] {
    display: none;
  }
`

Article.RightChildAsButton = RightChildAsButton

export default Article
