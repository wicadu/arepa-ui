import React from 'react'

import Notice from './Notice'

const translate = {
  es: {
    TITLE: 'Sin coincidencias',
    DESCRIPTION: 'Intenta con otro término de búsqueda.',
  },
}

function NoticeEmptySearch(): JSX.Element {
  return (
    <Notice
      name="search_off"
      title={translate['es'].TITLE}
      description={translate['es'].DESCRIPTION}
    />
  )
}

export default NoticeEmptySearch
