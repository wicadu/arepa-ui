import React from 'react'

import Notice from './Notice'

const translate = {
  es: {
    ERROR_TITLE: 'Ha ocurrido un error',
    ERROR_DESCRIPTION:
      'Se ha producido un error al intentar obtener la información',
  },
}

function NoticeError(): JSX.Element {
  return (
    <Notice
      name="error"
      title={translate['es'].ERROR_TITLE}
      description={translate['es'].ERROR_DESCRIPTION}
    />
  )
}

export default NoticeError
