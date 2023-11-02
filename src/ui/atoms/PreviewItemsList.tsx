import React, { useCallback, useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import { useNavigate } from '@reach/router'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Icon from './Icon'
import Image from './Image'
import Box from './Box'
import Typography from './Typography'
import SkeletonComponent from '../skeletons/PreviewItemsList'

const propTypes = {
  data: PropTypes.array.isRequired,
  totalItemsRemaining: PropTypes.number,
  inCard: PropTypes.bool,
  url: PropTypes.string,
  params: PropTypes.object,
}

const defaultProps: Props = {
  data: [],
  totalItemsRemaining: 0,
  inCard: false,
  url: '',
  params: {},
}

type Props = InferProps<typeof propTypes>

function PreviewItemsList({
  data,
  totalItemsRemaining,
  inCard,
  url,
  params
}: Props): JSX.Element {
  const navigate = useNavigate()

  const Wrapper = useMemo(() => (inCard ? CardContainer : Container), [inCard])

  const goTo = useCallback(() => url ? navigate(url, params) : null, [url, params])

  return (
    <Wrapper>
      <ItemsWrapper>
        {data?.slice(0, 3).map(({ id, image, restOfProps }) => image ? (
          <Image {...restOfProps} src={image} key={id} size={50} withBackground />
        ) :(
          <Icon name='fas fa-coffee' key={id} size={50} withBackground />
        ))}

        {!totalItemsRemaining ? null : (
          <Typography type='description' size={20} weight={700}>
            +{totalItemsRemaining}
          </Typography>
        )}
      </ItemsWrapper>

      <Icon
        size={50}
        withBackground
        name='fas fa-chevron-right'
        onClick={goTo}
      />
    </Wrapper>
  )
}

const containerCssStyles = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  min-width: 400px;

  @media screen and (max-width: 835px) {
    min-width: 276px;
  }
`

const Container = styled.div`
  ${containerCssStyles}
`

const CardContainer = styled(Box)`
  ${containerCssStyles}
  margin-bottom: 15px;
`

const ItemsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

PreviewItemsList.propTypes = propTypes
PreviewItemsList.defaultProps = defaultProps

PreviewItemsList.Skeleton = SkeletonComponent

export default PreviewItemsList
