import React, { useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

enum htmlType {
  default = 'default',
  title = 'title',
  'title-2' = 'title-2',
  'title-3' = 'title-3',
  'title-4' = 'title-4',
  description = 'description',
  helper = 'helper',
  link = 'link',
}

const propTypes = {
  type: PropTypes.oneOf(Object.values(htmlType)).isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  weight: PropTypes.oneOf([100, 300, 400, 600, 700, 'bold']),
  size: PropTypes.number,
  color: PropTypes.string,
  numberOfLines: PropTypes.number,
  children: PropTypes.node,
  dangerouslySetInnerHTML: PropTypes.shape({
    __html: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  afterStyles: PropTypes.exact({
    content: PropTypes.string,
    size: PropTypes.number,
    weight: PropTypes.number,
    color: PropTypes.string,
  }),
}

type Props = InferProps<typeof propTypes>

const defaultProps: Partial<Props> = {
  type: htmlType.default,
  align: 'left',
  afterStyles: {
    content: '',
    size: 12,
    weight: 300,
    color: '',
  },
}

function Typography({ children, type, ...props }: Props) {
  const Component = useMemo(() => {
    if (type === htmlType.title) return Title
    if (type === htmlType['title-2']) return Title2
    if (type === htmlType['title-3']) return Title3
    if (type === htmlType['title-4']) return Title4
    if (type === htmlType.helper) return Small
    if (type === htmlType.link) return Link

    return Default
  }, [type])

  return (
    <Component type={type} {...props}>
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

  ${addAfterStyles(afterStyles)}
`

const Title = styled.h1`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 30}px;
`

const Title2 = styled.h2`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 26}px;

  @media screen and (min-width: 768px) {
    font-size: 38px;
    line-height: 40px;
  }
`

const Title3 = styled.h3`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 20}px;
`

const Title4 = styled.h4`
  ${(props) => defaultStyles(props)}
  font-size: ${({ size }: any) => size || 18}px;
`

const Default = styled.p<any>`
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
`

const Small = styled.p`
  ${(props) =>
    defaultStyles({
      weight: 400,
      color: props?.theme.colors.FONT.HELPER,
      ...props,
    })}
  font-size: ${({ size }: any) => size || 13}px;
`

const Link = styled.a<any>`
  ${(props) => defaultStyles({ weight: 400, ...props })}
  font-size: ${({ size }: any) => size || 16}px;

  ${({ decoration }) => (decoration ? `text-decoration: ${decoration};` : '')}
`

Typography.propTypes = propTypes
Typography.defaultProps = defaultProps

export default Typography
