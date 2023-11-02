import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Box from '../atoms/Box'
import Typography from '../atoms/Typography'
import Image from '../atoms/Image'
import Icon from '../atoms/Icon'
import SkeletonComponent from '../skeletons/OrderItemSnippet'

const propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.string,
}

const defaultProps: Props = {
  image: '',
  name: '',
  description: '',
  quantity: null,
  price: null,
}

type Props = InferProps<typeof propTypes>

function OrderItemSnippet({
  image,
  name,
  description,
  quantity,
  price
}: Props) {
  return (
    <Box extraStyles={cssBoxStyles}>
      <Content>
        {image ? (
          <Image src={image} height={110} width={100} />
        ) : (
          <Icon
            name='fas fa-coffee'
            width='100%'
            height='110px'
            size={95}
            withBackground
          />
        )}
        <span>
          <Typography type='title-4' numberOfLines={1}>{name}</Typography>
          <Typography type='description' numberOfLines={3} size={13}>{description}</Typography>
          <Typography type='helper' weight={700} size={14}>{price}</Typography>
        </span>
      </Content>
      <Bottom>
        <Typography type='helper' weight={700}>{quantity} unidades</Typography>
      </Bottom>
    </Box>
  )
}

const cssBoxStyles = css`
  padding: 0px;
`

const Content = styled(Box)`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 10px;
  border-radius: 10px 10px 0 0;

  @media screen and (max-width: 468px) {
    grid-template-columns: 80px 1fr;
  }
`

const Bottom = styled.footer<Props>`
  display: flex;
  padding: 0 15px;
  align-items: center;
  border-radius: 0 0 10px 10px;
  height: 30px;
  background: ${({ theme }) => theme.colors.NEUTRAL.SELECTED};
  justify-content: center;
`

OrderItemSnippet.propTypes = propTypes
OrderItemSnippet.defaultProps = defaultProps

OrderItemSnippet.Skeleton = SkeletonComponent

export default OrderItemSnippet
