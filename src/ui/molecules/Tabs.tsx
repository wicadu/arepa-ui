import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const propTypes = {
  headers: PropTypes.arrayOf(PropTypes.element).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.element).isRequired,
}

type Props = PropTypes.InferProps<typeof propTypes>

function Tabs({ headers, tabs, ...props }: Props) {
  const { colors } = useTheme()
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Container {...props}>
      <HeadersRow>
        {headers?.map((children, index) => (
          <HeaderTab
            isItSelected={selectedTab === index}
            key={index}
            onClick={() => setSelectedTab(index)}>
            {React.cloneElement(children, {
              color: selectedTab === index ? colors.MAIN.PRIMARY : colors.FONT.DESCRIPTION,
            })}
          </HeaderTab>
        ))}
      </HeadersRow>

      <Row>{tabs?.[selectedTab]}</Row>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
`

const Row = styled.div``

const HeadersRow = styled.ul`
  display: flex;
`

const HeaderTab = styled.li<any>`
  flex-basis: 100%;
  list-style-type: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;

  border-bottom: 1px solid
    ${({ theme, isItSelected }: any) =>
      isItSelected ? theme.colors.MAIN.PRIMARY : theme.colors.NEUTRAL.TRANSPARENT};
`

export default Tabs
