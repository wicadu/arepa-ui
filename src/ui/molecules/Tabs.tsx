import React, { useState } from 'react'
import styled from '@emotion/styled'
import { SerializedStyles, useTheme } from '@emotion/react'

interface Props {
  headers: React.ReactElement[]
  tabs: React.ReactElement[]
  styles?: SerializedStyles | string
  className?: string
  defaultValue: number
  onChangeTabs: (index: number) => void
}

const defaultProps: Partial<Props> = {
  headers: [],
  tabs: [],
  styles: '',
  className: '',
  defaultValue: 0,
  onChangeTabs() {},
}

function Tabs(props: Props) {
  const { headers, tabs, styles, className, defaultValue, onChangeTabs } = {
    ...defaultProps,
    ...props,
  }

  const [selectedTab, setSelectedTab] = useState(defaultValue)

  const { colors } = useTheme()

  const onChange = (index: number) => {
    setSelectedTab(index)
    onChangeTabs?.(index)
  }

  return (
    <Container styles={styles} className={className}>
      <Headers>
        {headers?.map((children, index) => {
          const isActiveTab: boolean = selectedTab === index
          const isDisabledTab: boolean =
            React.isValidElement(children) && children.props.disabled

          return (
            <HeaderTab
              key={index}
              isActive={isActiveTab}
              isDisabledTab={isDisabledTab}
              onClick={() => (isDisabledTab ? null : onChange(index))}
              data-tabs-header
            >
              {React.isValidElement(children) &&
                React.cloneElement(children, {
                  color: isActiveTab
                    ? colors.MAIN.INFO
                    : colors.FONT.DESCRIPTION,
                  'data-active': isActiveTab,
                  'aria-disabled': isDisabledTab,
                })}
            </HeaderTab>
          )
        })}
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

const HeaderTab = styled.li<{ isActive: boolean; isDisabledTab: boolean }>`
  flex-basis: 100%;
  list-style-type: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme?.colors.MAIN.INFO : theme.colors?.NEUTRAL.TRANSPARENT};

  ${({ isDisabledTab }) => {
    let styles = ``

    if (isDisabledTab) {
      styles += `
          opacity: 0.4;
          cursor: not-allowed;
        `
    }

    return styles
  }}
`

export default Tabs
