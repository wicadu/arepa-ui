import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'

import Box from '../atoms/Box'

const propTypes = {
  noSpaces: PropTypes.bool
}

type Props = InferProps<typeof propTypes>

function PaymentSnippetSkeleton ({ noSpaces }: Props) {
  return (
    <Container noSpaces={noSpaces}>
      <Skeleton width={50} height={50} borderRadius={10} />
      <Content>
        <TopInformation>
          <Skeleton width={60} height={14} />
          <Skeleton width={50} height={8} />
        </TopInformation>
        <BottomInformation>
          <Skeleton width={80} height={20} />
          <Skeleton width={60} height={14} />
        </BottomInformation>
      </Content>
    </Container>
  )
}

const Container = styled(Box)<Props>`
  display: flex;
  gap: 10px;
  margin-bottom: ${({ noSpaces }) => noSpaces ? 0 : 10}px;
`

const Content = styled.div`
  width: 100%;
`

const TopInformation = styled.div`
  display: flex;
  justify-content: space-between;
`

const BottomInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`

export default PaymentSnippetSkeleton
