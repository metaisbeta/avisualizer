import React from 'react'

import { RadioButton } from '../../components/RadioButton'
import { TypeAnnotationContainer } from './styles'

type RadioButtonsProps = {
  typeAnnotation: string
  setTypeAnnotation: (type: string) => void
}

export const RadioButtons = ({
  typeAnnotation,
  setTypeAnnotation
}: RadioButtonsProps) => {
  return (
    <TypeAnnotationContainer
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setTypeAnnotation(e.target.value)
      }
    >
      <RadioButton
        label="System View"
        name="typeAnnotation"
        checked={typeAnnotation === 'System View'}
      />
      <RadioButton
        label="Package View"
        name="typeAnnotation"
        checked={typeAnnotation === 'Package View'}
      />
      <RadioButton
        label="Class View"
        name="typeAnnotation"
        checked={typeAnnotation === 'Class View'}
      />
    </TypeAnnotationContainer>
  )
}
