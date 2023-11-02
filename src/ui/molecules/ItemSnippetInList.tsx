import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Box from '../atoms/Box'
import Typography from '../atoms/Typography'
import Image from '../atoms/Image'
import Icon from '../atoms/Icon'
import SkeletonComponent from '../skeletons/ItemSnippetInList'

const propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.number
}

const defaultProps = {
  image: '',
  name: '',
  description: '',
  quantity: null
}

type Props = InferProps<typeof propTypes>

function ItemSnippetInList ({ image, name, description, quantity }: Props) {
  return (
    <Container>
      <Image src={image} size={80} />
      <Content>
        <div>
          <Typography type='title-4' size={17}>{name}</Typography>
          <Typography type='description' size={15}>{description}</Typography>
        </div>
        <Quantity size={14} weight={700}>Unidades: {quantity}</Quantity>
      </Content>
      <Icon
        size={50}
        name='fas fa-chevron-right'
        withBackground
      />
    </Container>
  )
}

const Container = styled(Box)`
  width: 100%;  
  display: grid;
  grid-template-columns: 80px 1fr 50px;
  align-content: center;
  gap: 10px;

  i.fas.fa-chevron-right {
    font-size: 15px;
    margin-top: auto;
    margin-bottom: auto;
  }

  @media screen and (max-width: 468px) {
    grid-template-columns: 60px 1fr 50px;
    gap: 5px;

    img {
      width: 60px;
      height: 60px;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
`

const Content = styled.div`
  display: grid;
  align-items: space-between;

  div > * {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  div > *:nth-child(1) {
    -webkit-line-clamp: 1;
  }

  div > *:nth-child(2) {
    -webkit-line-clamp: 2;
  }

`

const Quantity = styled(Typography)`
  display: flex;
  align-self: end;
  color: ${({ theme }) => theme.colors.FONT.HELPER};
`

ItemSnippetInList.propTypes = propTypes
ItemSnippetInList.defaultProps = defaultProps

ItemSnippetInList.Skeleton = SkeletonComponent

export default ItemSnippetInList
