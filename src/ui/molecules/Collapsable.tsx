import React, { useEffect, useState } from 'react'

import { css, SerializedStyles, useTheme } from '@emotion/react'

import Icon from '../atoms/Icon'
import Column from '../layout/Column'
import Row from '../layout/Row'

interface Props {
  value?: boolean
  header: React.ReactElement | React.ReactElement[] | undefined
  children: React.ReactElement | React.ReactElement[] | undefined
  containerStyles?: string | SerializedStyles
}

const defaultProps: Partial<Props> = {
  value: false
}

function Collapsable({ value, header, children, containerStyles }: Props) {
  const [isItCollapsed, setIsItCollapsed] = useState<boolean>(value)

  const { colors } = useTheme()

  const toggleIsItCollapsed = () => setIsItCollapsed(!isItCollapsed)

  useEffect(() => {
    if (value) setIsItCollapsed(value)
  }, [value])

  return (
    <Column align='center' gap={10} styles={containerStyles}>
      <Row onClick={toggleIsItCollapsed} styles={cssHeaderContainerStyles}>
        <Icon
          name={isItCollapsed ? 'arrow_drop_down' : 'arrow_right'}
          size={25}
          color={colors.FONT.TITLE}
        />
        {header}
      </Row>

      {isItCollapsed ? <Column>{children}</Column> : null}
    </Column>
  )
}

const cssHeaderContainerStyles = css`
  cursor: pointer;
`

Collapsable.defaultProps = defaultProps

export default Collapsable
