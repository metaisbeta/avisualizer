import React, { useState } from 'react'

import { RadioButton } from '../../components/RadioButton'
import { Table } from '../../components/Table'
import { ZoomableCircle } from '../../components/ZoomableCircle'
import classData from '../../data/SpaceWeatherTSI-CV.json'
import packageData from '../../data/SpaceWeatherTSI-PV.json'
import systemData from '../../data/SpaceWeatherTSI-SV.json'
import {
  Container,
  Content,
  InfoContainer,
  TypeAnnotationContainer,
  ZoomableCircleContainer
} from './styles'

export const Home = () => {
  const [typeAnnotation, setTypeAnnotation] = useState<string>('System View')
  const [annotationMetric, setAnnotationMetric] = useState<string>(
    'Number of Annotations'
  )
  const [packageName, setPackageName] = useState<string>('')

  return (
    <Container>
      <h1>Project Under Analysis: {systemData.name}</h1>

      <Content>
        <ZoomableCircleContainer>
          <InfoContainer>
            <h3>
              <b>Annotation Metric:</b> {annotationMetric}
            </h3>
            <h3>
              <b>{packageName.split(':')[0]}: </b> {packageName.split(': ')[1]}
            </h3>
          </InfoContainer>

          <ZoomableCircle
            systemData={systemData}
            packageData={packageData}
            classData={classData}
            typeAnnotation={{ typeAnnotation, setTypeAnnotation }}
            annotationMetric={{ annotationMetric, setAnnotationMetric }}
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
        </ZoomableCircleContainer>

        <Table />
      </Content>
    </Container>
  )
}
