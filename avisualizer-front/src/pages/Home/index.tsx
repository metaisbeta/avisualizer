import React, { useEffect, useState } from 'react'

import { Table } from '../../components/Table'
import { ClassVisualizer } from '../../components/ZoomableCircle/ClassView'
import { PackageVisualizer } from '../../components/ZoomableCircle/PackageView'
import { SystemVisualizer } from '../../components/ZoomableCircle/SystemView'
import geoClassData from '../../data/Geostore-CV.json'
import geoPackageData from '../../data/Geostore-PV.json'
import geoSystemData from '../../data/Geostore-SV.json'
import gujClassData from '../../data/Guj-CV.json'
import gujPackageData from '../../data/Guj-PV.json'
import gujSystemData from '../../data/Guj-SV.json'
import swClassData from '../../data/SpaceWeatherTSI-CV.json'
import swPackageData from '../../data/SpaceWeatherTSI-PV.json'
import swSystemData from '../../data/SpaceWeatherTSI-SV.json'
import { useProject } from '../../hooks/useProject'
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

  const { project, file } = useProject()
  console.log(file)
  useEffect(() => {
    const width = 500
    const height = 500

    document.getElementsByClassName('svg-container-sv')[0].innerHTML = ''
    document.getElementsByClassName('svg-container-pv')[0].innerHTML = ''
    document.getElementsByClassName('svg-container-cv')[0].innerHTML = ''

    let systemData = {}
    let packageData = {}
    let classData = {}

    if (project === 'Space Weather TSI') {
      systemData = swSystemData
      packageData = swPackageData
      classData = swClassData
    } else if (project === 'Guj') {
      systemData = gujSystemData
      packageData = gujPackageData
      classData = gujClassData
    } else if (project === 'Geostore') {
      systemData = geoSystemData
      packageData = geoPackageData
      classData = geoClassData
    } else {
      systemData = file[0]
      packageData = file[1]
      classData = file[2]
    }

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
  }, [project, file])

  return (
    <Container>
      <h1>Project Under Analysis: {project}</h1>

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

        <Table
          typeAnnotation={typeAnnotation}
          packageJson={
            project === 'Space Weather TSI'
              ? swPackageData
              : project === 'Guj'
              ? gujPackageData
              : project === 'Geostore'
              ? geoPackageData
              : file[1]
          }
        />
      </Content>
    </Container>
  )
}
