import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import { css, useTheme } from '@emotion/react'

import Box from '../atoms/Box'
import Typography from '../atoms/Typography'
import Image from '../atoms/Image'
import Icon from '../atoms/Icon'
import SkeletonComponent from '../skeletons/ItemSnippetInCard'

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

function ItemSnippetInCard ({ image, name, description, quantity }: Props) {
  const { colors }  = useTheme()

  return (
    <Box>
      <Figure>
        {image ? (
          <Image src={image} height='170px' />
        ) : (
          <Icon
            name='fas fa-coffee'
            width='100%'
            height='170px'
            size={145}
            withBackground
          />
        )}

        <figcaption><b>{name}</b></figcaption>
        <blockquote>{description}</blockquote>

        <Quantity quantity={quantity}>
          <Typography size={15} weight={700} color={colors.FONT.CONTRAST}>{quantity}</Typography>
        </Quantity>
      </Figure>
    </Box>
  )
}

const cssNumberOfLines = (number) => css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${number};
  -webkit-box-orient: vertical;
`

const Figure = styled.figure`
  display: inline-block;
  position: relative;

  figcaption {
    ${cssNumberOfLines(1)}

    color: ${({ theme }) => theme.colors.FONT.TITLE};
    font-size: 18px;
    margin-top: 10px;
  }

  blockquote {
    ${cssNumberOfLines(3)}

    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.FONT.DESCRIPTION};
  }
`

const Quantity = styled.b`
  display: ${({ quantity }) => typeof quantity !== 'number' ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  position: absolute;
  right: 0px;
  top: 140px;

  background: ${({ quantity, theme }) =>
    quantity ? theme.colors.MAIN.PRIMARY : theme.colors.MAIN.ERROR
  }
`

ItemSnippetInCard.propTypes = propTypes
ItemSnippetInCard.defaultProps = defaultProps

ItemSnippetInCard.Skeleton = SkeletonComponent

export default ItemSnippetInCard
