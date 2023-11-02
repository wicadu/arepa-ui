import React, { Fragment, useCallback, useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Box from '../atoms/Box'
import Typography from '../atoms/Typography'
import Image from '../atoms/Image'
import Icon from '../atoms/Icon'
import SkeletonComponent from '../skeletons/UserSnippet'

const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  rounded: PropTypes.bool,
  defaultIcon: PropTypes.string,
  inCard: PropTypes.bool,
  onClick: PropTypes.func
}

const defaultProps = {
  name: '',
  description: '',
  image: '',
  defaultIcon: 'far fa-user',
  onClick: null
}

type Props = InferProps<typeof propTypes>

function UserSnippet ({ inCard, defaultIcon, rounded, onClick, ...props }: Props) {
  const { name, image, description } = props

  const Container = useMemo(() => inCard ? Box : Fragment, [inCard])
  
  const handleClick = useCallback(() => onClick(props), [props])

  return (
    <Container>
      <Content onClick={onClick ? handleClick : null}>
        {image
          ? <Image src={image} size={50} withBackground fullRounded={rounded} />
          : <Icon name={defaultIcon} size={50} withBackground fullRounded={rounded} />
        }
        <div>
          <Typography size={16} weight={700}>{name}</Typography>
          <Typography type='description' size={14}>{description}</Typography>
        </div>
      </Content>
    </Container>
  )
}

const Content = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 10px;

  ${({ onClick }) => onClick && `
    &, & > * {
      cursor: pointer !important;
    }
  `}
`

UserSnippet.propTypes = propTypes
UserSnippet.defaultProps = defaultProps

UserSnippet.Skeleton = SkeletonComponent

export default UserSnippet
