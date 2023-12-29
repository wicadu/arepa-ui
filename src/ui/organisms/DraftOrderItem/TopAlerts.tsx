import React from 'react'
import styled from '@emotion/styled'

interface Props {
}

const defaultProps: Props = {

}

function DraftOrderItemTopAlerts({ }: Props) {
  return (
    <Container>
      Alert
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

DraftOrderItemTopAlerts.defaultProps = defaultProps

export default DraftOrderItemTopAlerts
