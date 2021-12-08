import React from 'react'

import { Container, Content } from './styles'
import { ModalProps } from './types'

export const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) {
    return null
  }

  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  )
}
