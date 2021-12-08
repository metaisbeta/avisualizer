/* eslint-disable prettier/prettier */
import React from 'react'

import { Container, TabHeader, TabContent } from './styles'
import { TabMenuProps } from './types'

export const TabMenu: React.FC<TabMenuProps> = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <Container>
      <TabHeader>
        {children.map((child, index: number) => {
          return (
            <li
              key={index}
              className={activeTab === index ? 'active-tab' : ''}
              onClick={() => setActiveTab(index)}
            >
              <h1>{child.props.title}</h1>
            </li>
          )
        })}
      </TabHeader>
      <TabContent>
        {children.map((child, index: number) => {
          if (activeTab !== index) {
            return null
          }

          return child
        })}
      </TabContent>
    </Container>
  )
}
