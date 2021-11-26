import React, { useEffect, useState } from 'react'

import { Table } from '../../components/Table'
import { ClassVisualizer } from '../../components/ZoomableCircle/ClassView'
import { PackageVisualizer } from '../../components/ZoomableCircle/PackageView'
import { SystemVisualizer } from '../../components/ZoomableCircle/SystemView'
import classData from '../../data/SpaceWeatherTSI-CV.json'
import packageData from '../../data/SpaceWeatherTSI-PV.json'
import systemData from '../../data/SpaceWeatherTSI-SV.json'
import {
  Container,
  Content,
  InfoContainer,
  ZoomableCircleContainer
} from './styles'

export const Home = () => {
  const [typeAnnotation, setTypeAnnotation] = useState<string>('System View')
  const [annotationMetric, setAnnotationMetric] = useState<string>(
    'Number of Annotations'
  )
  const [packageName, setPackageName] = useState<string>('')

  useEffect(() => {
    const width = 500
    const height = 500

    SystemVisualizer(
      systemData,
      width,
      height,
      packageData,
      setTypeAnnotation,
      'Number of Annotations',
      setAnnotationMetric,
      setPackageName
    )

    PackageVisualizer(
      packageData,
      width,
      height,
      setTypeAnnotation,
      'LOC in Annotation Declaration (LOCAD)',
      setAnnotationMetric,
      setPackageName
    )

    ClassVisualizer(
      classData,
      0,
      '',
      width,
      height,
      setTypeAnnotation,
      'Annotation Metric: Arguments in Annotation (AA)',
      setAnnotationMetric,
      setPackageName
    )
  }, [])

  return (
    <Container>
      <h1>Project Under Analysis: {systemData.name}</h1>

      <Content>
        <ZoomableCircleContainer>
          <InfoContainer>
            <h3>
              <b>Visualization:</b> {typeAnnotation}
            </h3>
            <h3>
              <b>Annotation Metric:</b> {annotationMetric}
            </h3>
            <h3>
              <b>{packageName.split(':')[0]}: </b> {packageName.split(': ')[1]}
            </h3>
          </InfoContainer>

          <div className="tooltip-container">
            <div
              className="svg-container-sv"
              style={{
                display: typeAnnotation === 'System View' ? 'block' : 'none'
              }}
            />
            <div
              className="svg-container-pv"
              style={{
                display: typeAnnotation === 'Package View' ? 'block' : 'none'
              }}
            />
            <div
              className="svg-container-cv"
              style={{
                display: typeAnnotation === 'Class View' ? 'block' : 'none'
              }}
            />
          </div>
        </ZoomableCircleContainer>

        <Table typeAnnotation={typeAnnotation} />
      </Content>
    </Container>
  )
}
