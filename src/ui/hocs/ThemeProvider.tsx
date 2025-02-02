import React, { useMemo } from 'react'

import { Global, ThemeProvider, css } from '@emotion/react'

import ResetCSS from '../assets/styles/ResetCSS'
import 'react-loading-skeleton/dist/skeleton.css'

import colors from '../constants/colors'

interface Props {
  children: React.ReactElement | React.ReactElement[] | React.ReactNode
  mode: 'LIGHT' | 'DARK'
  colors: {
    LIGHT: Record<string, unknown>
    DARK: Record<string, unknown>
  }
}

const defaultProps: Partial<Props> = {
  mode: 'LIGHT',
  colors: colors
}

function WrapperThemeProvider(props: Props) {
  const { children, colors, mode } = {
    ...defaultProps,
    ...props
  }

  const appColors = useMemo(() => colors[String(mode).toUpperCase()], [colors, mode])

  return (
    <ThemeProvider theme={{ colors: appColors, mode }}>
      <Global styles={ResetCSS} />
      <Global
        styles={
          css`
          @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,700;1,400;1,700&display=swap');
          @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
          @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,700;1,700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Catamaran&display=swap');

          html,
          body {
            background: ${appColors?.white};
            font-family: 'Cabin', sans-serif;
          }
        `
        }
      />

      {children}
    </ThemeProvider>
  )
}

export default WrapperThemeProvider
