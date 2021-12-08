import React, { useCallback, useState } from 'react'

import { useDropzone } from 'react-dropzone'

import { Container, InputContrainer } from './styles'
import { SelectProps } from './types'

export const Select: React.FC<SelectProps> = ({ onSelect }) => {
  const [selectedFilePath, setSelectedFilePath] = useState('')

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    setSelectedFilePath(file.path)

    onSelect(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Container>
      <h3>Folder</h3>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <InputContrainer>
          <button>Select</button>
          <input
            type="text"
            placeholder="Folder"
            value={selectedFilePath}
            disabled
          />
        </InputContrainer>
      </div>
    </Container>
  )
}
