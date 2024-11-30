import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'
import { useDataset } from '../../hooks'

enum htmlType {
  default = 'default',
  title = 'title',
  'title-2' = 'title-2',
  'title-3' = 'title-3',
  'title-4' = 'title-4',
  'title-5' = 'title-5',
  'title-6' = 'title-6',
  description = 'description',
  helper = 'helper',
  link = 'link',
}

interface Props {
  type: htmlType
  align?: 'left' | 'center' | 'right'
  weight?: 100 | 300 | 400 | 600 | 700 | 'bold'
  size?: number
  color?: string
  numberOfLines?: number
  children?: React.ReactNode | string | number
  dangerouslySetInnerHTML?: {
    __html: string | number
  }
  afterStyles?: {
    content: string
    size: number
    weight: number
    color?: string
  }
  datasets?: {
    [key: string]: string | number
  }
  decoration: string
  bold?: boolean
  styles?: string | SerializedStyles
  itemProp?: string
}

const defaultAfterStyles: Props['afterStyles'] = {
  content: '',
  size: 12,
  weight: 300,
  color: '',
}

const defaultProps: Partial<Props> = {
  type: htmlType.default,
  align: 'left',
  datasets: {},
  afterStyles: defaultAfterStyles,
}

function Typography(props: Props) {
  const { children, type, datasets, ...restOfProps } = {
    ...defaultProps,
    ...props,
  }

  const dataAttributes = useDataset(datasets)

  const Component = useMemo(() => {
    if (type === htmlType.title) return Title
    if (type === htmlType['title-2']) return Title2
    if (type === htmlType['title-3']) return Title3
    if (type === htmlType['title-4']) return Title4
    if (type === htmlType['title-5']) return Title5
    if (type === htmlType['title-6']) return Title6
    if (type === htmlType.helper) return Small
    if (type === htmlType.link) return Link

    return Default
  }, [type])

  return (
    <Component type={type} {...dataAttributes} {...restOfProps}>
      {children}
    </Component>
  )
}

const addAfterStyles = ({ content, size, weight, color }: any = {}) =>
  content?.length >= 1
    ? `
        &::after {
          content: '${content}';
          font-size: ${size}px;
          font-weight: ${weight};
          ${Boolean(color) ? `color: ${color};` : ''}
        }
      `
    : ''

const defaultStyles = ({
  weight = 700,
  theme = {},
  align = 'left',
  color,
  numberOfLines,
  lineHeight,
  afterStyles,
}: any) => `
  text-align: ${align};
  font-weight: ${weight};
  color: ${color || theme.colors.FONT.TITLE};
  ${lineHeight ? `line-height: ${lineHeight}px;` : ''}

  ${
    numberOfLines
      ? `
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: ${numberOfLines};
        -webkit-box-orient: vertical;
      `
      : ''
  }

  ${addAfterStyles({ ...defaultAfterStyles, ...afterStyles })}
`

const Title = styled.h1<Partial<Props>>`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 30}px;

  ${({ styles }) => styles}
`

const Title2 = styled.h2<Partial<Props>>`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 25}px;

  @media screen and (min-width: 768px) {
    font-size: 38px;
    line-height: 45px;
  }

  ${({ styles }) => styles}
`

const Title3 = styled.h3<Partial<Props>>`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 20}px;

  ${({ styles }) => styles}
`

const Title4 = styled.h4<Partial<Props>>`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 18}px;

  ${({ styles }) => styles}
`

const Title5 = styled.h5<Partial<Props>>`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 18}px;

  ${({ styles }) => styles}
`

const Title6 = styled.h6<Partial<Props>>`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 18}px;

  ${({ styles }) => styles}
`

const Default = styled.p<Partial<Props>>`
  ${(props) =>
    defaultStyles({
      weight: 400,
      ...(props.type === 'description'
        ? { color: props?.theme.colors.FONT.DESCRIPTION }
        : {}),
      ...props,
    })}

  font-size: ${({ size }: any) => size || 16}px;

  ${({ bold }) =>
    bold &&
    `
    font-weight: bold;
    color: #6B6B6C;
  `}

  @media screen and (min-width: 768px) {
    font-size: 20px;
    line-height: 30px;
  }

  ${({ styles }) => styles}
`

const Small = styled.p<Partial<Props>>`
  ${(props) =>
    defaultStyles({
      weight: 400,
      color: props?.theme.colors.FONT.HELPER,
      ...props,
    })}
  font-size: ${({ size }: any) => size || 13}px;

  ${({ styles }) => styles}
`

const Link = styled.a<Partial<Props>>`
  ${(props) => defaultStyles({ weight: 400, ...props })}
  font-size: ${({ size }: any) => size || 16}px;

  ${({ decoration }) => (decoration ? `text-decoration: ${decoration};` : '')}
  ${({ styles }) => styles}
`

export { Props as TypographyProps }

export default Typography
