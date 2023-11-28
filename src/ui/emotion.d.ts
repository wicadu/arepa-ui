import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      MAIN: {
        PRIMARY: string
        SECONDARY: string
        SUCCESS: string
        ERROR: string
        WARNING: string
        INFO: string
      }
      NEUTRAL: {
        BACKGROUND: string
        CARD: string
        SIDE: string
        SELECTED: string
        TRANSPARENT: string
      }
      FONT: {
        TITLE: string
        DESCRIPTION: string
        HELPER: string
        CONTRAST: string
      }
    }
  }
}
