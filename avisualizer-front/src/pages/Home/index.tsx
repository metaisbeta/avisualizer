import React, { useEffect, useState } from 'react'

import { RadioButton } from '../../components/RadioButton'
import { Table } from '../../components/Table'
import { ZoomableCircle } from '../../components/ZoomableCircle'
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
  const [annotationMetric, setAnnotationMetric] = useState<string>('')
  const [packageName, setPackageName] = useState<string>('')
  const [data, setData] = useState<any>()

  useEffect(() => {
    if (typeAnnotation === 'System View') setData(systemData)
    else if (typeAnnotation === 'Package View') setData(undefined)
    else setData(undefined)
  }, [typeAnnotation])

  return (
    <Container>
      <h1>Project Under Analysis: {data?.name}</h1>

      <InfoContainer>
        <h3>
          <b>Annotation Metric:</b> {annotationMetric}
        </h3>
        <h3>
          <b>Package:</b> {packageName}
        </h3>
      </InfoContainer>

      <Content>
        <ZoomableCircleContainer>
          {data && (
            <ZoomableCircle
              systemData={systemData}
              packageData={packageData}
              typeAnnotation={{ typeAnnotation, setTypeAnnotation }}
              annotationMetric={{ annotationMetric, setAnnotationMetric }}
              setPackageName={setPackageName}
            />
          )}

          <TypeAnnotationContainer
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData(undefined)
              setTypeAnnotation(e.target.value)
            }}
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

        <Table />
      </Content>
    </Container>
  )
}
