import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import Box from '../atoms/Box'
import Typography from '../atoms/Typography'
import Icon from '../atoms/Icon'
import Badge from '../atoms/Badge'
import SkeletonComponent from '../skeletons/PaymentSnippet'

const propTypes = {
  method: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  status: PropTypes.string,
  noSpaces: PropTypes.bool
}

const defaultProps = {
  method: '',
  date: '',
  amount: 0,
  status: '',
  noSpaces: false
}

type Props = InferProps<typeof propTypes>

function PaymentSnippet ({ method, date, amount, status, noSpaces }: Props) {
  const { colors } = useTheme()

  return (
    <Container noSpaces={noSpaces}>
      <Icon
        name='fas fa-credit-card'
        size={50}
        withBackground
        color={colors.FONT.DESCRIPTION}
      />
      <Content>
        <TopInformation>
          <Typography type='description' weight={700}>{method}</Typography>
          <Typography type='description' size={12}>{date}</Typography>
        </TopInformation>
        <BottomInformation>
          <Badge>{status}</Badge>
          <Typography type='description' weight={700}>{amount}</Typography>
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

PaymentSnippet.propTypes = propTypes
PaymentSnippet.defaultProps = defaultProps

PaymentSnippet.Skeleton = SkeletonComponent

export default PaymentSnippet
