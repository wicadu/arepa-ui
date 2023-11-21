import React from 'react'

import { DocsContainer } from '@storybook/addon-docs/blocks'

import Theme from '../src/ui/hocs/ThemeProvider'
import colors from '../src/ui/constants/colors'

const withThemeProvider = (Story, context) => {
  return (
    <Theme>
      <Story {...context} />
    </Theme>
  )
}

export const decorators = [withThemeProvider]

export const parameters = {
  viewMode: 'docs',
  layout: 'padded',
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: colors.LIGHT.NEUTRAL.BACKGROUND },
      { name: 'dark', value: colors.DARK.NEUTRAL.BACKGROUND },
    ],
  },
  docs: {
    container: ({ children, context }) => {
      return (
        <Theme>
          <DocsContainer context={context}>{children}</DocsContainer>
        </Theme>
      )
    },
  },
}
