import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { Global, ThemeProvider, css } from '@emotion/react'

import ResetCSS from '../assets/styles/ResetCSS'
import 'react-loading-skeleton/dist/skeleton.css'

import colors from '../constants/colors'

const propTypes = {
  mode: PropTypes.oneOf(['LIGHT', 'DARK']),
  colors: PropTypes.shape({
    LIGHT: PropTypes.object,
    DARK: PropTypes.object
  })
}

const defaultProps = {
  mode: 'LIGHT',
  colors: colors
}

function WrapperThemeProvider ({ children, colors, mode }) {
  const appColors = useMemo(() => colors[String(mode).toUpperCase()], [colors, mode])

  return (
    <ThemeProvider theme={{ colors: appColors, mode }}>
      <Global styles={ResetCSS} />
      <Global styles={
        css`
          @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,700;1,400;1,700&display=swap');
          @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

          html,
          body {
            background: ${appColors?.white};
            font-family: 'Cabin', sans-serif;
          }
        `
      } />
      {children}
    </ThemeProvider>
  )
}

WrapperThemeProvider.propTypes = propTypes
WrapperThemeProvider.defaultProps = defaultProps

export default WrapperThemeProvider
