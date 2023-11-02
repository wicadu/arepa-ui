import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import styled from '@emotion/styled'
import Icon from './Icon'

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  withBackground: PropTypes.bool,
  noPictureIcon: PropTypes.string,
  noPictureIconSize: PropTypes.number,
}

const defaultProps = {
  width: 100,
  height: 100,
  noPictureIconSize: 24,
}

type Props = InferProps<typeof propTypes>

const Image = ({
  src,
  withBackground,
  noPictureIcon,
  noPictureIconSize,
  ...props
}: Props) => {
  return (
    <Container {...props}>
      {Boolean(src) ? (
        <Figure withBackground={withBackground}>
          <Img src={src} />
        </Figure>
      ) : (
        <Icon name={noPictureIcon} size={noPictureIconSize} color='white' />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: ${({ width }) => `${width}px`}; 
  height: ${({ height }) => `${height}px`};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Figure = styled.figure`
  width: 100%;
  height: 100%;
  ${({ theme, withBackground }) => withBackground &&
    `background: ${theme.colors.NEUTRAL.BACKGROUND};`
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

Image.propTypes = propTypes
Image.defaultProps = defaultProps

export default Image
