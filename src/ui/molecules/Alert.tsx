import React, { useEffect, useMemo, useState } from 'react'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import Typography from '../atoms/Typography'
import Icon from '../atoms/Icon'
import hexToRGBA from '../../utils/hexToRGBA'

export enum AlertTypes {
  Success = 'SUCCESS',
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING'
}

enum AlertSize {
  Small = 'SMALL',
  Medium = 'MEDIUM',
}

const _types = {
  [AlertTypes.Success]: 'check_circle',
  [AlertTypes.Error]: 'cancel',
  [AlertTypes.Info]: 'watch_later',
  [AlertTypes.Warning]: 'watch_later',
}

interface Props {
  title: string
  description: string
  type: AlertTypes
  show: boolean
  closeCallback?: () => void
  width: string
  autoClose: number | null
  size?: AlertSize
}

const defaultProps: Partial<Props> = {
  title: '',
  description: '',
  type: AlertTypes.Info,
  show: true,
  closeCallback: null,
  width: '100%',
  autoClose: null,
  size: AlertSize.Medium
}

function Alert({
  title,
  description,
  type,
  show,
  closeCallback,
  width,
  autoClose,
  size
}: Props) {
  const [visible, setVisibility] = useState(false)

  const { colors } = useTheme()

  const color = useMemo(() => colors.MAIN[String(type).toUpperCase()], [type])

  const handleClose = () => {
    setVisibility(false)
    closeCallback?.()
  }

  useEffect(() => {
    setVisibility(show)

    if (autoClose && show) {
      setTimeout(() => handleClose(), autoClose)
    }
  }, [show, autoClose])

  return (
    <Container width={width} show={visible} type={type} size={size}>
      <Icon name={_types?.[type?.toUpperCase()]} size={28} color={color} />

      <Content size={size}>
        <Typography weight={700} size={12} color={color}>{title}</Typography>
        <Typography size={10} color={color}>{description}</Typography>
      </Content>

      {closeCallback ? (
        <Icon
          name='close'
          size={closeCallback ? 20 : 0}
          color={color}
          onClick={handleClose}
        />
      ) : null}

      <OpacityCanceler color={color} />
    </Container>
  )
}

const Container = styled.div<Partial<Props>>`
  position: relative;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  
  ${({ type, theme, show, width, size }) => {
    if (!show) return 'display: none;'

    const { colors } = theme

    let style: string = ''

    if (size === AlertSize.Small) {
      style += `
        padding: 6px;

        .${_types?.[type]} {
          font-size: 20px;
        }

        .close {
          font-size: 14px;
        }
      `
    }

    const mainColor = colors.MAIN?.[String(type).toUpperCase()]

    style += `
      width: ${width};
      color: ${mainColor};
      background-color: ${colors.NEUTRAL.BACKGROUND};
      border: 1px solid ${mainColor};
    `

    return style
  }}
`

const Content = styled.span<Partial<Props>>`
  flex: 1;

  ${({ size }) => {
    let style: string = ''

    if (size === AlertSize.Small) {
      style += `
        display: flex;
        justify-content: space-between;
        align-items: center;
      `
    }

    return style
  }}
`

const OpacityCanceler = styled.div<Partial<Props>>`
  border-radius: 10px;
  background-color: ${({ color }) => hexToRGBA(color, 0.1)};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

Alert.defaultProps = defaultProps

export default Alert
