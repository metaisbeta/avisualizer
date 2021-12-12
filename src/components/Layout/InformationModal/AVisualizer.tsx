import React from 'react'

import visualization from '../../../assets/visualization.png'
import { Content, ImgContent } from './styles'

export const AVisualizer = () => {
  return (
    <Content>
      <p>
        Enterprise Java frameworks and APIs such as JPA (Java Persistence API),
        Spring, EJB (Enterprise Java Bean), and JUnit make extensive use of code
        annotations as means to allow applications to configure custom metadata
        and execute specific behavior.
      </p>

      <p>
        Then, the AVisualizer proposes to measure code annotations usage and
        analyze their distribution from the bubbles visualization.
      </p>

      <ImgContent>
        <img
          src={visualization}
          alt="Imagem da visualização das anotações"
          style={{ width: '280px' }}
        />
      </ImgContent>
    </Content>
  )
}
