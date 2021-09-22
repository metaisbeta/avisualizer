import React from 'react'

import { Container } from './styles'
import { RadioButtonProps } from './types'

export const Checkbox: React.FC<RadioButtonProps> = ({
  label,
  checked = false,
  ...rest
}) => {
  return (
    <Container>
      <input type="checkbox" checked={checked} {...rest} />
      <span />
    </Container>
  )
}
