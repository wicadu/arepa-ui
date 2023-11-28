import React, { useMemo } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import Icon from '../../atoms/Icon'
import Button from '../../atoms/Button'
import Typography from '../../atoms/Typography'

import NoticeError from './NoticeError'
import NoticeUnavailable from './NoticeUnavailable'
import NoticeEmptySearch from './NoticeEmptySearch'

const propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toAction: PropTypes.func,
  toActionText: PropTypes.string,
  noSpace: PropTypes.bool,
}

const defaultProps: Props = {
  description: '',
  title: '',
  name: '',
  toAction: null,
  toActionText: '',
  noSpace: false,
}

type Props = InferProps<typeof propTypes>

function Notice({
  description,
  name,
  title,
  toAction,
  toActionText,
  noSpace,
}: Props) {
  const { colors } = useTheme()

  const color = useMemo(() => colors.FONT.DESCRIPTION, [colors])
  const showButton = useMemo(() => toActionText?.length, [toActionText])

  return (
    <Container noSpace={noSpace}>
      <Icon name={name} size={50} color={color} />
      <Typography type="title-4" size={26} color={color}>
        {title}
      </Typography>
      <Typography color={color} align="center">
        {description}
      </Typography>

      {showButton ? (
        <Button type="link" onClick={toAction}>
          {toActionText}
        </Button>
      ) : null}
    </Container>
  )
}

const Container = styled.div<Props>`
  display: grid;
  justify-items: center;
  gap: 10px;
  margin: ${({ noSpace }) => (noSpace ? 0 : 40)}px 0;

  .material-icons {
    margin-bottom: 10px;
  }

  button {
    margin-top: 10px;
  }
`

Notice.propTypes = propTypes
Notice.defaultProps = defaultProps

Notice.Error = NoticeError
Notice.Unavailable = NoticeUnavailable
Notice.EmptySearch = NoticeEmptySearch

export default Notice
