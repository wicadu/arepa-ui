import React from 'react'
import styled from '@emotion/styled'
import PropTypes, { InferProps } from 'prop-types'

enum spinType {
  primary = 'primary',
  success = 'success',
  error = 'error',
  warning = 'warning',
  ghost = 'ghost',
  white = 'white',
}

const propTypes = {
  center: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.oneOf<spinType>(Object.values(spinType)),
}

type Props = InferProps<typeof propTypes>

const defaultProps = {
  size: 40,
  type: spinType.primary,
}

function SpinComponent({ center, size, type, ...props }: Props) {
  return (
    <Wrapper center={center} data-testid="loading-spin-testid" {...props}>
      <Spin size={size} type={type}>
        <div className='double-bounce1' />
        <div className='double-bounce2' />
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div<Props>`
  ${({ center }) =>
    center &&
    `
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
  `}
`

const Spin = styled.div<Props>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;

  .double-bounce1,
  .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    background-color: ${({ type, theme }) => {
      if (type === spinType.ghost) return theme.colors.NEUTRAL.SELECTED
      if (type === spinType.white) return theme.colors.FONT.TITLE
      if (type === spinType.link) return theme.colors.MAIN.PRIMARY

      return theme.colors.MAIN?.[String(type).toUpperCase()]
    }};

    -webkit-animation: sk-bounce 2s infinite ease-in-out;
    animation: sk-bounce 2s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`

SpinComponent.propTypes = propTypes
SpinComponent.defaultProps = defaultProps

export default SpinComponent
