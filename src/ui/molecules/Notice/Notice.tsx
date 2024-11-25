import React, { useMemo } from 'react'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import Icon from '../../atoms/Icon'
import Button from '../../atoms/Button'
import Typography from '../../atoms/Typography'

import NoticeError from './NoticeError'
import NoticeUnavailable from './NoticeUnavailable'
import NoticeEmptySearch from './NoticeEmptySearch'

interface Props {
  description: string
  title: string
  name: string
  toAction?: () => void
  toActionText?: string
  noSpace?: boolean
}

const defaultProps: Props = {
  description: '',
  title: '',
  name: '',
  toAction: null,
  toActionText: '',
  noSpace: false,
}

function Notice(props: Props) {
  const { description, name, title, toAction, toActionText, noSpace } = {
    ...defaultProps,
    ...props,
  }

  const { colors } = useTheme()

  const color = useMemo(() => colors.FONT.DESCRIPTION, [colors])
  const showButton = useMemo(() => toActionText?.length, [toActionText])

  return (
    <Container noSpace={noSpace}>
      <Icon name={name} size={50} color={color} />
      <Typography type="title-4" size={22} color={color}>
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

Notice.Error = NoticeError
Notice.Unavailable = NoticeUnavailable
Notice.EmptySearch = NoticeEmptySearch

export default Notice
