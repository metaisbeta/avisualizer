import React, { Component, useEffect, useState } from 'react'

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
  const [appName, setAppName] = useState<string>('Carregando...')
  const [typeAnnotation, setTypeAnnotation] = useState<string>('System View')
  const [annotationMetric, setAnnotationMetric] = useState<string>(
    'Number of Annotations'
  )
  const [packageName, setPackageName] = useState<string>('')
  let name = null

  function render(sv: any, pv: any, cv: any) {
    const width = 500
    const height = 500

    SystemVisualizer(
      sv,
      width,
      height,
      packageData,
      setTypeAnnotation,
      'Number of Annotations',
      setAnnotationMetric,
      setPackageName
    )

    PackageVisualizer(
      pv,
      width,
      height,
      setTypeAnnotation,
      'LOC in Annotation Declaration (LOCAD)',
      setAnnotationMetric,
      setPackageName
    )

    ClassVisualizer(
      cv,
      0,
      '',
      width,
      height,
      setTypeAnnotation,
      'Annotation Metric: Arguments in Annotation (AA)',
      setAnnotationMetric,
      setPackageName
    )
  }

  useEffect(() => {
    const width = 500
    const height = 500

    let sv: any
    let pv: any
    let cv: any

    const search = window.location.search
    const params = new URLSearchParams(search)
    const projectID = params.get('projeto')

    if (projectID == null) {
      sv = systemData
      pv = packageData
      cv = classData
      name = systemData.name
      setAppName(
        'Project Under Analysis: ' +
          +name.charAt(0).toUpperCase() +
          name.slice(1)
      )
      render(sv, pv, cv)
    } else {
      const request = async () => {
        const response = await fetch(
          'https://avisualizer-plugin.herokuapp.com/data.json?project=' +
            projectID
        )
        const json = await response.json()
        sv = JSON.parse(json.sv)
        cv = JSON.parse(json.cv)
        pv = JSON.parse(json.pv)
        name = json.name
        setAppName(
          'Project Under Analysis: ' +
            name.charAt(0).toUpperCase() +
            name.slice(1)
        )
      }
      request().then(() => {
        render(sv, pv, cv)
      })
    }
  }, [])

  return (
    <Container>
      <h1>{appName}</h1>

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
