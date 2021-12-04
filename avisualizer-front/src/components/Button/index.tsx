import React from 'react'

import { ButtonStyled } from './styles'
import { ButtonProps } from './types'

export const Button: React.FC<ButtonProps> = ({
  colorInvert = false,
  disabled = false,
  children,
  ...props
}) => {
  return (
    <ButtonStyled
      type="button"
      disabled={disabled}
      colorInvert={colorInvert}
      {...props}
    >
      <div>{children}</div>
    </ButtonStyled>
  )
}
