import React, { useState } from 'react'

import logo from '../../../assets/logo.svg'
import { Modal } from '../../Modal'
import { SelectProjectModal } from '../../Modal/SelectProjectModal'
import { DemonstrationModal } from '../DemonstrationModal'
import { InformationModal } from '../InformationModal'
import { Container, Content, LogoContainer } from './styles'

export const Header = () => {
  const [openInformationModal, setOpenInformationModal] = useState(false)
  const [openDemonstrationModal, setOpenDemonstrationModal] = useState(false)
  const [openProjectModal, setOpenProjectModal] = useState(false)

  return (
    <Container>
      <LogoContainer>
        <img src={logo} />
        <h1>Visualizer</h1>
      </LogoContainer>

      <Content>
        <button onClick={() => setOpenProjectModal(true)}>
          Select your project
        </button>

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

      <Modal isOpen={openProjectModal}>
        <SelectProjectModal onClose={() => setOpenProjectModal(false)} />
      </Modal>
    </Container>
  )
}
