import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

import Typography from '../atoms/Typography'
import Icon from '../atoms/Icon'
import hexToRGBA from '../../utils/hexToRGBA'

import { UIElementSizesEnum } from '../ts/enums/UIElementSizesEnum'
import { UIElementStatusEnum } from '../ts/enums/UIElementStatusEnum'

const _types = {
  [UIElementStatusEnum.Success]: 'check_circle',
  [UIElementStatusEnum.Error]: 'cancel',
  [UIElementStatusEnum.Info]: 'watch_later',
  [UIElementStatusEnum.Warning]: 'watch_later',
}

interface Props {
  title: string
  description: string
  type: `${UIElementStatusEnum}`
  show?: boolean
  width?: string
  size?: `${UIElementSizesEnum}`
  styles?: SerializedStyles | string
  time?: number
  outlined?: boolean
  className?: string
}

const defaultProps: Partial<Props> = {
  title: '',
  description: '',
  type: UIElementStatusEnum.Info,
  show: true,
  width: '100%',
  size: UIElementSizesEnum.Medium,
  styles: '',
  time: 0,
  outlined: true,
  className: '',
}

function Alert(props: Props) {
  const {
    title,
    description,
    type,
    show,
    width,
    size,
    styles,
    time,
    outlined,
    className,
  } = {
    ...defaultProps,
    ...props,
  }

  const [showAlert, setShowAlert] = useState<boolean>(show)

  useEffect(() => {
    setShowAlert(show)

    if (time && show) {
      const timer = setTimeout(() => setShowAlert(false), time)
      return () => clearTimeout(timer)
    }
  }, [time, show])

  return (
    <Container
      width={width}
      show={showAlert}
      type={type}
      size={size}
      styles={styles}
      outlined={outlined}
      className={className}
    >
      <Icon
        name={_types?.[type?.toLowerCase()]}
        size={28}
        datasets={{
          'data-alert-icon': true,
        }}
      />

      <Content size={size}>
        <Typography type="default" weight={700} size={14} children={title} />
        <Typography type="default" size={12} children={description} />
      </Content>

      <OpacityCanceler type={type} outlined={outlined} />
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
  overflow: hidden;

  [data-alert-icon='true'] {
    z-index: 1;
  }

  ${({ type, theme, show, width, size, outlined }) => {
    if (!show) return 'display: none;'

    const { colors } = theme

    const color: string = colors?.MAIN?.[String(type).toUpperCase()]

    let style: string = `
      *, [data-alert-icon='true'] {
        color: ${outlined ? color : colors?.FONT?.CONTRAST} !important;
      }

      @media screen and (min-width: 768px) {
        .material-icons {
          font-size: 36px;
        }

        p {
          line-height: normal;
        }
      }
    `

    if (size === UIElementSizesEnum.Small) {
      style += `
        border-radius: 6px;
        height: 25px;
        padding: 6px;

        .${_types?.[String(type)?.toLowerCase()]} {
          font-size: 12px;
        }

        @media screen and (min-width: 768px) {
          height: 38px;
          border-radius: 10px;
          padding: 10px 15px;
          gap: 12px;

          .${_types?.[String(type)?.toLowerCase()]} {
            font-size: 16px;
          }     
        }
      `
    }

    style += `
      width: ${width};
      color: ${color};
      background-color: ${colors.NEUTRAL.BACKGROUND};
      border: 1px solid ${color};
    `

    return style
  }}

  ${({ styles }) => styles}
`

const Content = styled.span<Partial<Props>>`
  flex: 1;
  z-index: 1;

  ${({ size }) => {
    let style: string = ''

    if (size === UIElementSizesEnum.Small) {
      style += `
        display: flex;
        justify-content: space-between;
        align-items: center;

        p:first-of-type {
          font-size: 10px;
        }

        p:last-of-type {
          font-size: 8px;
        }

        @media screen and (min-width: 768px) {
          p:first-of-type {
            font-size: 14px;
          }
            
          p:last-of-type {
            font-size: 12px;
          }
        }
      `
    }

    return style
  }}
`

const OpacityCanceler = styled.div<Partial<Props>>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  ${({ outlined, theme, type }) => {
    const color: string = theme?.colors?.MAIN[String(type).toUpperCase()]
    return `background-color: ${outlined ? hexToRGBA(color, 0.1) : color}`
  }}
`

export default Alert
