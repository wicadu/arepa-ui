import React, { useEffect, useState } from 'react'

import { css, SerializedStyles, useTheme } from '@emotion/react'
import styled from '@emotion/styled'

import Icon from '../atoms/Icon'
import Column from '../layout/Column'
import Row from '../layout/Row'

interface Props {
  value?: boolean
  header: React.ReactElement | React.ReactElement[] | undefined
  children: React.ReactElement | React.ReactElement[] | undefined
  containerStyles?: string | SerializedStyles
  wrapperTag?: keyof JSX.IntrinsicElements | React.ElementType
  className?: string
}

const defaultProps: Partial<Props> = {
  value: false,
  className: '',
  wrapperTag: 'section',
}

function Collapsable(props: Props) {
  const { value, header, children, containerStyles, className, wrapperTag } = {
    ...defaultProps,
    ...props,
  }

  const [isItCollapsed, setIsItCollapsed] = useState<boolean>(value)

  const { colors } = useTheme()

  const toggleIsItCollapsed = () => setIsItCollapsed(!isItCollapsed)

  useEffect(() => {
    if (value) setIsItCollapsed(value)
  }, [value])

  return (
    <StyledWrapper
      align="center"
      gap={10}
      styles={containerStyles}
      className={className}
      as={wrapperTag}
    >
      <Row
        onClick={toggleIsItCollapsed}
        gap={0}
        styles={cssHeaderContainerStyles}
        as="header"
      >
        <Icon
          name={isItCollapsed ? 'arrow_drop_down' : 'arrow_right'}
          size={25}
          color={colors.FONT.TITLE}
        />
        {header}
      </Row>

      {isItCollapsed ? <Column gap={0}>{children}</Column> : null}
    </StyledWrapper>
  )
}

const StyledWrapper = styled(Column)``

const cssHeaderContainerStyles = css`
  cursor: pointer;
`

export default Collapsable
