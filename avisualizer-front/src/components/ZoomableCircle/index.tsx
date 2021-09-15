/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import * as d3 from 'd3'

import { AnnotationSchemas } from '../../utils/AnnotationSchemas'
import {
  addCircleDash,
  addCircleStroke,
  colorCircles,
  highlightNode
} from '../../utils/Circle'
import { updateSelectBoxText } from '../../utils/NavUtils'
import { createPopUp, destroyPopUp, movePopUp } from '../../utils/PopUp'
import {
  createNode,
  createSvg,
  hide,
  resetView,
  setFocus,
  showView,
  viewTransition
} from '../../utils/SVGUtils'
import { zoom, zoomTo } from '../../utils/ZoomUtils'
import { ZoomableCircleProps } from './types'

export const ZoomableCircle: React.FC<ZoomableCircleProps> = ({
  data,
  typeAnnotation: { typeAnnotation, setTypeAnnotation },
  annotationMetric: { annotationMetric, setAnnotationMetric },
  setPackageName
}) => {
  const readVisualizer = (data: any) => {
    const width = 500
    const height = 500

    const zoomProp: { focus: any } = { focus: null }

    const root: any = d3
      .hierarchy(data)
      .sum((d: { value: number }) => d.value)
      .sort((a, b) => {
        if (b.value && a.value) return b.value - a.value
        else return 0
      })

    const pack = d3
      .pack()
      .size([width - 2, height - 10])
      .padding(3)

    pack(root)

    zoomProp.focus = root

    const { schemasColorMap } = AnnotationSchemas(root, 'locad')

    const svg = createSvg('.svg-container-sv', width, height, 'sistema')

    d3.select('.svg-container-sv').attr(
      'lastSelected',
      root.descendants()[1].data.name
    )

    d3.select('.svg-container-sv').attr(
      'rootName',
      root.children?.[0].data.name
    )

    const node = createNode(svg, root)

    zoomTo([root.x, root.y, root.r * 2], width, zoomProp, node)

    setTypeAnnotation('System View')
    setAnnotationMetric('Number of Annotations')
    setPackageName(root.children?.[0].data.name)

    d3.select('.svg-container-sv')
      .selectAll('circle')
      .attr('stroke', (d) => addCircleStroke(d))
      .attr('stroke-dasharray', (d) => addCircleDash(d))
      .attr('fill', (d) => colorCircles(d, schemasColorMap))

    svg
      .selectAll('circle')
      .on('click', (event, d: any) => {
        d3.select('#packagesList')
          .selectAll('option')
          .each(function () {
            if (
              d3.select(this).attr('value') == d.parent.data.name &&
              d.data.type == 'schema'
            ) {
              return d3.select(this).property('selected', true)
            } else if (d3.select(this).attr('value') == d.data.name) {
              return d3.select(this).property('selected', true)
            }
          })

        if (d.data.type === 'schema') {
          updateSelectBoxText('SelectViewBox', 'packageView')
          hide('.svg-container-pv', d.parent.data.name)
          highlightNode('.svg-container-sv', d.parent.data.name)
          zoomProp.focus !== d &&
            (zoom(event, d, zoomProp, svg, node),
            event.stopPropagation(),
            setFocus(d.parent.data.name, '.svg-container-sv'))
          showView('system-view', 'package-view')
          viewTransition(
            String(d3.select('.svg-container-sv').attr('lastSelected')),
            '.svg-container-pv'
          )
          setTypeAnnotation('Package View')
          setAnnotationMetric('LOC in Annotation Declaration (LOCAD)')
          setPackageName(root.parent.data.name)
          resetView('.svg-container-sv')
        } else {
          highlightNode('.svg-container-sv', d.data.name)
          zoomProp.focus !== d &&
            (zoom(event, d, zoomProp, svg, node),
            event.stopPropagation(),
            setFocus(d.data.name, '.svg-container-sv'))
          setTypeAnnotation('System View')
          setAnnotationMetric('Number of Annotations')
          setPackageName(root.data.name)
        }
      })
      .on('mouseover', (event, d: any) => {
        createPopUp(d, event, annotationMetric)

        const name = d.data.name

        d3.select('.svg-container-sv')
          .selectAll('circle')
          .each(function () {
            // Highlight table line
            if (d3.select(this).attr('name') === name) {
              const color = d3.select(this).style('fill')

              d3.select('tbody')
                .selectAll('td')
                .each(function () {
                  if (
                    d3.select(this).attr('class') === 'td-schema' &&
                    d3.select(this).attr('name') === name
                  ) {
                    d3.select(this).style('color', color)
                  }
                })
            }
          })
      })
      .on('mouseout', (_, d: any) => {
        destroyPopUp()

        const name = d.data.name

        d3.select('.svg-container-sv')
          .selectAll('circle')
          .each(function () {
            if (d3.select(this).attr('name') === name) {
              d3.select('tbody')
                .selectAll('td')
                .each(function () {
                  if (
                    d3.select(this).attr('class') === 'td-schema' &&
                    d3.select(this).attr('name') === name
                  ) {
                    d3.select(this).style('color', '#393939')
                  }
                })
            }
          })
      })
      .on('mousemove', (event, d: any) => movePopUp(d, event, annotationMetric))
      .on('contextmenu', (event) => {
        event.preventDefault()
      })
  }

  readVisualizer(data)

  return (
    <div className="tooltip-container">
      <div className="svg-container-sv"></div>
    </div>
  )
}
