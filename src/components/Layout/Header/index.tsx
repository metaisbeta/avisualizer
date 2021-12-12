import React, { useState } from 'react'

import logo from '../../../assets/logo.svg'
import { InformationModal } from '../InformationModal'
import { Container, Content, LogoContainer } from './styles'

export const Header = () => {
  const [openInformationModal, setOpenInformationModal] = useState(false)

  return (
    <Container>
      <LogoContainer>
        <img src={logo} />
        <h1>Visualizer</h1>
      </LogoContainer>

      <Content>
        <button>Select your project</button>

        <button onClick={() => setOpenInformationModal(true)}>
          Informations
        </button>
      </Content>

      <InformationModal
        isOpen={openInformationModal}
        setIsOpen={setOpenInformationModal}
      />
    </Container>
  )
}
