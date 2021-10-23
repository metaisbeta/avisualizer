import React from 'react'

import { Header } from './Header'
import { Container, Content } from './styles'
import { LayoutProps } from './types'

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />

      <Content>{children}</Content>
    </Container>
  )
}
