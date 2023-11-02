import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'

import Icon from '../atoms/Icon'
import Box from '../atoms/Box'

const propTypes = {
  inCard: PropTypes.bool,
  children: PropTypes.node.isRequired,
  withBorders: PropTypes.bool
}

const defaultProps: Props = {
  inCard: false,
  withBorders: false
}

type Props = InferProps<typeof propTypes>

function SearchBar ({ children, withBorders, inCard }: Props) {
  const [expaded, setExpanded] = useState<boolean>(false)

  const handleToggle = useCallback(() => setExpanded(!expaded), [expaded])

  const Container = useMemo(() => inCard ? Box : Fragment, [inCard])

  return (
    <Container {...(inCard ? { withBorders } : {})}>
      <Header>
        <div>{children?.[0]}</div>
        <Icon
          name={`fas fa-chevron-${expaded ? 'up' : 'down'}`}
          onClick={handleToggle}
          size={22}
        />
      </Header>
      {expaded && <Body>{children?.[1]}</Body>}
    </Container>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Body = styled.div`
  padding-top: 10px;
`

SearchBar.propTypes = propTypes
SearchBar.defaultProps = defaultProps

export default SearchBar
