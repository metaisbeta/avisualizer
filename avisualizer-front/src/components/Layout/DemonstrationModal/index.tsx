import React from 'react'

import { IoCloseOutline } from 'react-icons/io5'
import Modal from 'react-modal'

import { useProject } from '../../../hooks/useProject'
import { Button } from '../../Button'
import { Container } from './styles'
import { DemonstrationModalProps } from './types'

export const DemonstrationModal = ({
  isOpen,
  setIsOpen
}: DemonstrationModalProps) => {
  const { project, changeProject } = useProject()

  const handleChangeProject = (project: string) => {
    changeProject(project)

    setIsOpen(false)
  }

  const checkProjectedSelected = (name: string) => {
    if (project === name) return true
    return false
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="react-modal-close"
        >
          <IoCloseOutline size={24} />
        </button>

        <h1>Demonstration Projects</h1>

        <table>
          <tbody>
            <tr>
              <td width="80%">Space Weather TSI</td>
              <td>
                <Button
                  disabled={checkProjectedSelected('Space Weather TSI')}
                  onClick={() => handleChangeProject('Space Weather TSI')}
                >
                  Carregar
                </Button>
              </td>
            </tr>
            <tr>
              <td>Guj</td>
              <td>
                <Button
                  disabled={checkProjectedSelected('Guj')}
                  onClick={() => handleChangeProject('Guj')}
                >
                  Carregar
                </Button>
              </td>
            </tr>
            <tr>
              <td>Geostore</td>
              <td>
                <Button
                  disabled={checkProjectedSelected('Geostore')}
                  onClick={() => handleChangeProject('Geostore')}
                >
                  Carregar
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </Modal>
  )
}
