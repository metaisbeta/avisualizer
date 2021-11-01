import React from 'react'

import { ButtonStyled } from './styles'
import { ButtonProps } from './types'

export const Button: React.FC<ButtonProps> = ({
  colorInvert = false,
  children,
  ...props
}) => {
  return (
    <ButtonStyled type="button" colorInvert={colorInvert} {...props}>
      <div>{children}</div>
    </ButtonStyled>
  )
}
