import React, { useCallback } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import { useNavigate } from '@reach/router'

import Icon from '../atoms/Icon'
import Button from '../atoms/Button'

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    url: PropTypes.string
  })),
  autoFill: PropTypes.bool
}

type Props = InferProps<typeof propTypes>

const defaultProps = {
}

function Breadcrumbs({ items }: Props) {
  const navigate = useNavigate()

  const handleClick = useCallback(({ target }) => navigate(target.dataset.url), [])

  return (
    <Container>
      {items?.map(({ label, url }, index) => (
        <Item key={index}>
          <Button type='link' onClick={handleClick} data-url={url}>{label}</Button>
          {!(items?.length - 1 <= index) && <Icon name='fas fa-chevron-right' size={10} />}
        </Item>
      ))}
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  gap: 5px;
`

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
`


Breadcrumbs.propTypes = propTypes
Breadcrumbs.defaultProps = defaultProps

export default Breadcrumbs
