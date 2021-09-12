import React, { useState } from 'react'

import { RadioButton } from '../../components/RadioButton'
import { ZoomableCircle } from '../../components/ZoomableCircle'
import jsonData from '../../data/SpaceWeatherTSI.json'
import {
  Container,
  Content,
  TypeAnnotationContainer,
  ZoomableCircleContainer
} from './styles'

export const Home = () => {
  const [title, setTitle] = useState<string>('')
  const [typeAnnotation, setTypeAnnotation] = useState<string>('System View')
  const [a, setA] = useState<string>('')
  const [annotationMetric, setAnnotationMetric] = useState<string>('')
  const [packageName, setPackageName] = useState<string>('')
  const [data, setData] = useState(jsonData)

  return (
    <Container>
      <h1>{title}</h1>

      <Content>
        <ZoomableCircleContainer>
          <h3>
            <b>Annotation Metric:</b> {annotationMetric}
          </h3>
          <h3>
            <b>Package:</b> {packageName}
          </h3>

          <ZoomableCircle
            data={data}
            setTitle={setTitle}
            setTypeAnnotation={setA}
            setAnnotationMetric={setAnnotationMetric}
            setPackageName={setPackageName}
          />

          <TypeAnnotationContainer
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTypeAnnotation(e.target.value)
            }
          >
            <RadioButton
              label="System View"
              name="typeAnnotation"
              defaultChecked
            />
            <RadioButton label="Package View" name="typeAnnotation" />
            <RadioButton label="Class View" name="typeAnnotation" />
          </TypeAnnotationContainer>
        </ZoomableCircleContainer>
      </Content>
    </Container>
  )
}
