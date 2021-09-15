import React from 'react'

import logo from '../../../assets/logo.svg'
import { Container, Content, LogoContainer } from './styles'

export const Header = () => {
  return (
    <Container>
      <LogoContainer>
        <img src={logo} />
        <h1>Visualizer</h1>
      </LogoContainer>

      <Content>
        <button>Select your project</button>

        <button>Informations</button>
      </Content>
    </Container>
  )
}
