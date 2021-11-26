import React, { useState } from 'react'

import { IoCloseOutline } from 'react-icons/io5'
import Modal from 'react-modal'

import { AnnotationMetric } from './AnnotationMetric'
import { AVisualizer } from './AVisualizer'
import { Button, Container, Tab } from './styles'
import { InformationModalProps } from './types'
import { Visualization } from './Visualization'

export const InformationModal = ({
  isOpen,
  setIsOpen
}: InformationModalProps) => {
  const [tabOptionSelected, setTabOptionSelected] = useState('1st')

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <Tab>
          <Button
            onClick={() => setTabOptionSelected('1st')}
            selected={tabOptionSelected === '1st'}
          >
            AVisualizer
          </Button>
          <Button
            onClick={() => setTabOptionSelected('2nd')}
            selected={tabOptionSelected === '2nd'}
          >
            Visualization
          </Button>
          <Button
            onClick={() => setTabOptionSelected('3rd')}
            selected={tabOptionSelected === '3rd'}
          >
            Annotation Metric
          </Button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="react-modal-close"
          >
            <IoCloseOutline size={24} />
          </button>
        </Tab>

        {tabOptionSelected === '1st' ? (
          <AVisualizer />
        ) : tabOptionSelected === '2nd' ? (
          <Visualization />
        ) : (
          <AnnotationMetric />
        )}
      </Container>
    </Modal>
  )
}
