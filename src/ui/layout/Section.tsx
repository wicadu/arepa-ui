import React, { ReactNode, ReactElement, useMemo } from 'react'
import { SerializedStyles, css } from '@emotion/react'

import Typography, { TypographyProps } from '../atoms/Typography'
import Button from '../atoms/Button'
import Row from './Row'

import styled from '@emotion/styled'

type AfterStyles = {
  content: string
  size: number
  weight: number
  color?: string
}

interface Props {
  children: ReactNode | ReactElement | ReactElement[]
  title: string | ReactElement
  titleAfterStyles?: AfterStyles
  titleProps?: TypographyProps
  description?: string
  descriptionAfterStyles?: AfterStyles
  descriptionProps?: TypographyProps
  rightChild?: string | ReactElement
  className?: string
  styles?: SerializedStyles | string
  titleHtmlType?: string
}

const defaultProps: Partial<Props> = {
  title: null,
  titleHtmlType: 'title-3',
  titleAfterStyles: {} as AfterStyles,
  titleProps: {} as TypographyProps,
  description: '',
  descriptionAfterStyles: {} as AfterStyles,
  descriptionProps: {} as TypographyProps,
  rightChild: null,
  children: null,
  className: '',
  styles: '',
}

function Section(props: Props) {
  const {
    title,
    titleHtmlType,
    titleAfterStyles,
    titleProps,
    description,
    descriptionAfterStyles,
    rightChild,
    children,
    className,
    styles,
    descriptionProps,
  } = {
    ...defaultProps,
    ...props,
  }

  const renderHeader: boolean = useMemo(
    () => Boolean(description?.length) || Boolean(title) || Boolean(rightChild),
    [description, title, rightChild]
  )

  return (
    <Container className={className} styles={styles}>
      {title && <meta itemProp="name" content={title} />}

      {renderHeader && (
        <header>
          <Row align="space-between" gap={0} styles={cssTitleStyles}>
            {typeof title === 'string' ? (
              <Typography
                type={titleHtmlType}
                lineHeight={30}
                size={20}
                children={title}
                afterStyles={titleAfterStyles}
                data-title
                {...titleProps}
              />
            ) : (
              title
            )}

            {rightChild}
          </Row>
          {Boolean(description?.length) && (
            <Typography
              type="description"
              styles={cssDescriptionStyles}
              lineHeight={25}
              afterStyles={descriptionAfterStyles}
              data-description
              {...descriptionProps}
            >
              {description}
            </Typography>
          )}
        </header>
      )}

      {children}
    </Container>
  )
}

const Container = styled.section<Partial<Props>>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    gap: 15px;
  }

  ${({ styles }) => styles}
`

const cssTitleStyles = css`
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

const cssDescriptionStyles = css`
  @media screen and (min-width: 768px) {
    font-size: 20px;
    line-height: 30px;
  }
`

interface RightChildAsButtonProps {
  onClick: () => void
  text: string
  hide?: boolean
}

export function RightChildAsButton({
  onClick,
  text,
  hide,
  ...restOfProps
}: RightChildAsButtonProps) {
  if (hide) return

  return (
    <RightChildButton
      type="link"
      width="auto"
      data-section-link
      onClick={onClick}
      highlight={undefined}
      children={text}
      {...restOfProps}
    />
  )
}

const RightChildButton = styled(Button)`
  font-size: 12px !important;
  min-width: fit-content;

  color: ${({ theme }) => theme?.colors?.MAIN?.INFO} !important;

  @media screen and (min-width: 768px) {
    font-size: 16px !important;
  }
`

Section.RightChildAsButton = RightChildAsButton

export default Section
