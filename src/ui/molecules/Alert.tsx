import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import { StatusEnum } from '../ts/enums/StatusEnum'
import Typography from '../atoms/Typography'
import Icon from '../atoms/Icon'
import hexToRGBA from '../../utils/hexToRGBA'

enum StatusIconsEnum {
  SUCCESS = 'check_circle',
  ERROR = 'cancel',
  WARNING = 'error',
  INFO = 'watch_later',
}

const propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(StatusEnum)),
  float: PropTypes.bool,
  show: PropTypes.bool,
  autoClose: PropTypes.bool,
  noClose: PropTypes.bool,
  onCloseCallback: PropTypes.func,
  width: PropTypes.string,
}

const defaultProps: Props = {
  message: '',
  title: '',
  type: StatusEnum.INFO,
  float: false,
  show: false,
  autoClose: false,
  onCloseCallback() {},
  width: '307px',
}

type Props = InferProps<typeof propTypes>

function Alert({
  className,
  width,
  message,
  type,
  title,
  float,
  show,
  autoClose,
  noClose,
  onCloseCallback,
}: Props) {
  const [visible, setVisibility] = useState(false)
  const { colors }: any = useTheme()

  const tonalityColor = useMemo(
    () => colors.MAIN[String(type).toUpperCase()],
    [type]
  )

  const handleClose = useCallback(() => {
    setVisibility(false)
    onCloseCallback()
  }, [setVisibility, onCloseCallback])

  useEffect(() => {
    setVisibility(show)

    if (autoClose && show) setTimeout(() => handleClose(), 5000)
  }, [show])

  if (!visible) return null

  return (
    <Container className={className} float={float} width={width}>
      <Tonality color={tonalityColor} noClose={noClose}>
        <Icon
          name={StatusIconsEnum[String(type).toUpperCase()]}
          size={28}
          color={tonalityColor}
        />

        <span>
          <Typography weight={700} size={14} color={tonalityColor}>
            {title}
          </Typography>
          <Typography size={12} color={tonalityColor}>
            {message}
          </Typography>
        </span>

        {!noClose && (
          <Icon
            name='cancel'
            color={tonalityColor}
            size={35}
            onClick={handleClose}
          />
        )}
      </Tonality>
    </Container>
  )
}

const Container = styled.div<any>`
  width: ${({ width }) => width};

  ${({ float }) =>
    float &&
    `      
    width: calc(100% - 335px);
    min-width: 296px;
    max-width: 770px;
    position: absolute;
    top: 25px;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    z-index: 9;

    @media screen and (max-width: 835px) {
      top: 65px;
      width: calc(100% - 24px);
    }
  `}

  @media screen and (min-width: 768px) {
    width: 715px;
  }
`

const Tonality = styled.div<any>`
  display: grid;
  grid-template-columns: 28px 1fr ${({ noClose }) => (noClose ? '' : '28px')};
  gap: 12px;
  align-items: center;
  background-color: ${({ color }) => hexToRGBA(color, 0.1)};
  border: 1px solid ${({ color }) => color};
  border-radius: 10px;
  padding: 10px 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 39px 1fr ${({ noClose }) => (noClose ? '' : '28px')};

    span {
      font-size: 39px;
    }
  }
`

Alert.propTypes = propTypes
Alert.defaultProps = defaultProps

export default Alert
