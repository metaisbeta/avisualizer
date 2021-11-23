import React from 'react'

import classCircle from '../../../assets/class-circle.png'
import packageCircle from '../../../assets/package-circle.png'
import { Content, ImgContent } from './styles'

export const Visualization = () => {
  return (
    <Content>
      <p>
        At first, we will have the visualization of the complete system with
        several circles. Circles with dotted lines will represent packages and
        those with a white background will represent classes.
      </p>

      <ImgContent>
        <img src={packageCircle} alt="Imagem da visualização dos pacotes" />
        <div
          style={{
            width: '191px',
            height: '151px',
            background: '#E9E9E9',
            textAlign: 'center'
          }}
        >
          <img src={classCircle} alt="Imagem da visualização dos classes" />
        </div>
      </ImgContent>

      <p>
        In addition, the visualization is divided into levels, that is, if you
        want to visualize a package or class, just click on the necessary
        circles to reach the desired layer. To go back a layer, you need to
        click outside the circle you are viewing.
      </p>
    </Content>
  )
}
