import React from 'react'
import styled from '@emotion/styled'

enum spinType {
  primary = 'primary',
  success = 'success',
  error = 'error',
  warning = 'warning',
  ghost = 'ghost',
  white = 'white',
}

interface Props {
  center?: boolean,
  size?: number,
  type: spinType,
}

const defaultProps = {
  size: 40,
  type: spinType.primary,
}

function SpinComponent(props: Props) {
  const { center, size, type, ...propsLeft } = {
    ...defaultProps,
    ...props,
  }

  return (
    <Wrapper center={center} data-testid="loading-spin-testid" {...propsLeft}>
      <Spin size={size} type={type}>
        <div className='double-bounce1' />
        <div className='double-bounce2' />
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div<Partial<Props>>`
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

export default SpinComponent
