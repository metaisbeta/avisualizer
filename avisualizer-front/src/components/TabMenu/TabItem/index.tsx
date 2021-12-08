import React from 'react'

import { Container } from './styles'
import { TabProps } from './types'

export const TabItem: React.FC<TabProps> = ({ children }) => {
  return <Container>{children}</Container>
}
