import React from 'react'

import { Container } from '../../styles/styles'

export const Error = () => {
  return (
    <Container>
      <h1>Error</h1>
      <br></br>
      <h4>This project is not supported by Avisualizer.</h4>
      <br></br>
      <h4>
        Please, share some details with us in our Github{' '}
        <a href={'https://github.com/metaisbeta/avisualizer/issues'}>
          Issues page.
        </a>
      </h4>
    </Container>
  )
}
