import React, { useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import Icon from './Icon'
import Button from './Button'
import Typography from './Typography'

const propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toAction: PropTypes.func,
  toActionText: PropTypes.string,
  noSpace: PropTypes.bool
}

const defaultProps: Props = {
  description: '',
  title: '',
  name: '',
  toAction: null,
  toActionText: '',
  noSpace: false
}

type Props = InferProps<typeof propTypes>

function Notice ({ description, name, title, toAction, toActionText, noSpace }: Props) {
  const { colors } = useTheme()

  const color = useMemo(() => colors.FONT.DESCRIPTION, [colors])
  const showButton = useMemo(() => toActionText?.length, [toActionText])

  return (
    <Container noSpace={noSpace}>
      <Icon name={name} size={50} color={color} />
      <Typography type='title-4' size={26} color={color}>{title}</Typography>
      <Typography color={color}>{description}</Typography>

      {showButton ? <Button size='small' onClick={toAction}>{toActionText}</Button> : null}
    </Container>
  )
}

const Container = styled.div<Props>`
  display: grid;
  justify-items: center;
  margin: ${({ noSpace }) => noSpace ? 0 : 40}px 0;

  button {
    margin-top: 10px;
  }
`

Notice.propTypes = propTypes
Notice.defaultProps = defaultProps

export default Notice
