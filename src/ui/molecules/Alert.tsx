import React, { useEffect, useMemo, useState } from 'react'

import styled from '@emotion/styled'
import { SerializedStyles, useTheme } from '@emotion/react'

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
  type: UIElementStatusEnum
  show: boolean
  width: string
  size?: UIElementSizesEnum
  styles?: SerializedStyles | string
  time?: number
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
}

function Alert(props: Props) {
  const { title, description, type, show, width, size, styles, time } = {
    ...defaultProps,
    ...props,
  }

  const [showAlert, setShowAlert] = useState<boolean>(show)

  const { colors } = useTheme()

  const color = useMemo(() => colors.MAIN[String(type).toUpperCase()], [type])

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
    >
      <Icon name={_types?.[type?.toLowerCase()]} size={28} color={color} />

      <Content size={size}>
        <Typography weight={700} color={color}>
          {title}
        </Typography>
        <Typography color={color}>{description}</Typography>
      </Content>

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

    let style: string = `
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

    const mainColor = colors.MAIN?.[String(type).toUpperCase()]

    style += `
      width: ${width};
      color: ${mainColor};
      background-color: ${colors.NEUTRAL.BACKGROUND};
      border: 1px solid ${mainColor};
    `

    return style
  }}

  ${({ styles }) => styles}
`

const Content = styled.span<Partial<Props>>`
  flex: 1;
  z-index: 2;

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
  border-radius: 10px;
  background-color: ${({ color }) => hexToRGBA(color, 0.1)};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`

export default Alert
