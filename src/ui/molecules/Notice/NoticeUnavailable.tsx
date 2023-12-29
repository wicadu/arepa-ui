import React from 'react'

import Notice from './Notice'

const translate = {
  es: {
    ERROR_TITLE: 'Información no disponible',
    ERROR_DESCRIPTION: 'Hubo un problema al intentar obtener la información.',
  },
}

function NoticeUnavailable(): JSX.Element {
  return (
    <Notice
      name="fas fa-exclamation-circle"
      title={translate['es'].ERROR_TITLE}
      description={translate['es'].ERROR_DESCRIPTION}
    />
  )
}

export default NoticeUnavailable
