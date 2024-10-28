import React, { useState } from 'react'
import styled from '@emotion/styled'
import { SerializedStyles, useTheme } from '@emotion/react'

interface Props {
  headers: React.ReactElement[]
  tabs: React.ReactElement[]
  styles?: SerializedStyles | string
  onChangeTabs: (index: number) => void
}

function Tabs({ headers, tabs, styles, onChangeTabs }: Props) {
  const [selectedTab, setSelectedTab] = useState(0)

  const { colors } = useTheme()

  const onChange = (index: number) => {
    setSelectedTab(index)
    onChangeTabs?.(index)
  }

  return (
    <Container styles={styles}>
      <Headers>
        {headers?.map((children, index) => (
          <HeaderTab
            isActive={selectedTab === index}
            key={index}
            onClick={() => onChange(index)}
          >
            {React.cloneElement(children, {
              color: selectedTab === index ? colors.MAIN.PRIMARY : colors.FONT.DESCRIPTION,
            })}
          </HeaderTab>
        ))}
      </Headers>

      <Row>{tabs?.[selectedTab]}</Row>
    </Container>
  )
}

const Container = styled.div<{ styles?: SerializedStyles | string }>`
  height: 100%;

  ${({ styles }) => styles}
`

const Row = styled.div`
  height: 100%;
`

const Headers = styled.ul`
  display: flex;
`

const HeaderTab = styled.li<{ isActive: boolean }>`
  flex-basis: 100%;
  list-style-type: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid
    ${({ theme, isActive }) => isActive ? theme?.colors.MAIN.PRIMARY : theme.colors?.NEUTRAL.TRANSPARENT};
`

export default Tabs
