import React from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'
import Icon from './Icon'

const propTypes = {
  handleClick: PropTypes.func
}

function Notification ({ handleClick }) {
  return (
    <Wrapper onClick={handleClick}>
      <Icon name='far fa-bell' />        
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & {
    cursor: pointer;
    transition: 0.5s;
    padding: 8px 12px;
    border: none;
    border-radius: 50px;
    margin: 0;
  }

  &:hover {
    background-color: ${({ theme}) => theme.colors.white}
  }
`

Notification.propTypes = propTypes

export default Notification
