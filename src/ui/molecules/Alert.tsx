import React, { useMemo } from 'react'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

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
}

const defaultProps: Partial<Props> = {
  title: '',
  description: '',
  type: UIElementStatusEnum.Info,
  show: true,
  width: '100%',
  size: UIElementSizesEnum.Medium
}

function Alert({ title, description, type, show, width, size }: Props) {
  const { colors } = useTheme()

  const color = useMemo(() => colors.MAIN[String(type).toUpperCase()], [type])

  return (
    <Container width={width} show={show} type={type} size={size}>
      <Icon name={_types?.[type?.toLowerCase()]} size={28} color={color} />

      <Content size={size}>
        <Typography weight={700} size={12} color={color}>{title}</Typography>
        <Typography size={10} color={color}>{description}</Typography>
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
        padding: 6px;

        .${_types?.[type]} {
          font-size: 20px;
        }

        .close {
          font-size: 14px;
        }

        @media screen and (min-width: 768px) {
          p {
            font-size: 16px;
          }
          
          .material-icons {
            font-size: 20px;
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

Alert.defaultProps = defaultProps

export default Alert
