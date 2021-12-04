import React, { useState } from 'react'

import logo from '../../../assets/logo.svg'
import { DemonstrationModal } from '../DemonstrationModal'
import { InformationModal } from '../InformationModal'
import { Container, Content, LogoContainer } from './styles'

export const Header = () => {
  const [openInformationModal, setOpenInformationModal] = useState(false)
  const [openDemonstrationModal, setOpenDemonstrationModal] = useState(false)

  return (
    <Container>
      <LogoContainer>
        <img src={logo} />
        <h1>Visualizer</h1>
      </LogoContainer>

      <Content>
        <button>Select your project</button>

        <button onClick={() => setOpenDemonstrationModal(true)}>
          Demonstration
        </button>

        <button onClick={() => setOpenInformationModal(true)}>
          Informations
        </button>
      </Content>

      <InformationModal
        isOpen={openInformationModal}
        setIsOpen={setOpenInformationModal}
      />

      <DemonstrationModal
        isOpen={openDemonstrationModal}
        setIsOpen={setOpenDemonstrationModal}
      />
    </Container>
  )
}
