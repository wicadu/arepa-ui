import React, { useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Box from '../atoms/Box'
import Typography from '../atoms/Typography'
import Badge from '../atoms/Badge'
import PreviewItemsList from '../atoms/PreviewItemsList'
import SkeletonComponent from '../skeletons/OrderSnippet'

const propTypes = {
  status: PropTypes.string,
  id: PropTypes.number.isRequired,
  date: PropTypes.string,
  items: PropTypes.array,
}

const defaultProps = {
  status: '',
  id: null,
  date: '',
  items: [],
}

type Props = InferProps<typeof propTypes>

function OrderSnippet ({ status, id, date, items, total, ...props }: Props) {
  const totalItemsRemaining = useMemo(() => total - items.length, [total, items])

  return (
    <Container>
      <Header status={status}>
        {status ? <Badge>{status}</Badge> : null}
        <Typography weight={700}>#{id}</Typography>
        <Typography type='description' size={12}>{date}</Typography>
      </Header>
      <Content>
        <PreviewItemsList
          data={items}
          totalItemsRemaining={totalItemsRemaining}
          {...props}
        />
      </Content>
    </Container>
  )
}

const Container = styled(Box)`
  display: grid;
  gap: 10px;
  margin-bottom: 15px;
`

const Header = styled.div<Props>`
  display: grid;
  align-items: center;
  gap: 10px;
  grid-template-columns: ${({ status }) => status ? 'auto auto 1fr' : 'auto 1fr'};
  
  & *:last-child {
    justify-self: flex-end;
  }
`

const Content = styled.div`
  display: grid;
  justify-content: end;
`

OrderSnippet.propTypes = propTypes
OrderSnippet.defaultProps = defaultProps

OrderSnippet.Skeleton = SkeletonComponent

export default OrderSnippet
