import React from 'react'

import { SerializedStyles, useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import Row from '../layout/Row'
import Typography from '../atoms/Typography'
import Icon from '../atoms/Icon'
import { hexToRGBA } from '../../utils'

export enum Types {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

const _types = {
  [Types.Success]: 'check_circle',
  [Types.Error]: 'cancel',
  [Types.Info]: 'watch_later',
  [Types.Warning]: 'watch_later',
}

interface Props {
  type?: Types
  text?: string
  textColor?: string
  textSize?: number
  iconSize?: number
  textStyles?: SerializedStyles | string
  containerStyles?: SerializedStyles | string
  className?: string
}

const defaultProps: Partial<Props> = {
  type: Types.Info,
  textSize: 14,
  iconSize: 18,
  textStyles: '',
  className: '',
}

function StatusChip(props: Props) {
  const {
    containerStyles,
    type,
    text,
    textColor,
    textSize,
    iconSize,
    textStyles,
    className,
  } = {
    ...defaultProps,
    ...props,
  }

  const { colors } = useTheme()

  return (
    <Row gap={5} className={className} styles={containerStyles}>
      <CheckIcon
        name={_types?.[type?.toLowerCase()]}
        type={type}
        size={iconSize}
      />

      {text && (
        <Typography
          color={textColor || colors.MAIN?.[String(type).toUpperCase()]}
          weight={700}
          size={textSize}
          styles={textStyles}
        >
          {text}
        </Typography>
      )}
    </Row>
  )
}

const CheckIcon = styled(Icon)`
  ${({ theme, type }) => {
    const mainColor =
      theme.colors.MAIN?.[String(type).toUpperCase()] ||
      theme?.colors.MAIN.PRIMARY

    return `
      border-radius: 25px;
      padding: 3px;
      background: ${hexToRGBA(mainColor, 0.15)};
      border: 1px solid ${mainColor};
      color: ${mainColor};
    `
  }}
`

export default StatusChip
