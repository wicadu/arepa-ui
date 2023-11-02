import React, { Fragment, useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'

import Box from '../atoms/Box'

const propTypes = {
  rounded: PropTypes.bool,
  inCard: PropTypes.bool,
}

type Props = InferProps<typeof propTypes>

function UserSnippet({ inCard, rounded }: Props) {
  const Container = useMemo(() => (inCard ? Box : Fragment), [inCard])

  return (
    <Container>
      <Content>
        <Skeleton borderRadius={10} width={50} height={50} circle={rounded} />
        <div>
          <Skeleton width={125} height={16} />
          <Skeleton width={80} height={14} />
        </div>
      </Content>
    </Container>
  )
}

const Content = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 10px;
`

UserSnippet.propTypes = propTypes

export default UserSnippet
