import React from 'react'

import { Container, Content } from './styles'

export const Header = () => {
  return (
    <Container>
      <h1>@Visualizer</h1>

      <Content>
        <button>Select your project</button>

        <button>Informations</button>
      </Content>
    </Container>
  )
}
