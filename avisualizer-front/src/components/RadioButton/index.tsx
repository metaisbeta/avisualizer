import React from 'react'

import { Container } from './styles'
import { RadioButtonProps } from './types'

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  checked,
  ...rest
}) => {
  return (
    <Container>
      <p>{label}</p>
      <input
        type="radio"
        value={label}
        name={name}
        {...rest}
        checked={checked}
      />
      <span />
    </Container>
  )
}
