/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'

import * as d3 from 'd3'

import { annotMetricUpdate } from '../../../utils/AnnotationMetric'
import { annotationSchemas } from '../../../utils/AnnotationSchemas'
import {
  addCircleDash,
  addCircleStroke,
  colorCircles,
  highlightNode
} from '../../../utils/Circle'
import { updateSelectBoxText } from '../../../utils/Nav'
import { createPopUp, destroyPopUp, movePopUp } from '../../../utils/PopUp'
import {
  createNode,
  createSvg,
  hide,
  resetView,
  setFocus,
  showView,
  viewTransition
} from '../../../utils/SVG'
import { zoom, zoomTo } from '../../../utils/Zoom'
import { ZoomableCircleProps } from '../types'

export const PackageView: React.FC<any> = ({
  systemData,
  typeAnnotation: { typeAnnotation, setTypeAnnotation },
  annotationMetric: { annotationMetric, setAnnotationMetric },
  setPackageName
}) => {
  const findObjectByLabel = function (objs: any, label: any): any {
    if (objs.name === label) return objs
    else {
      if (objs.children) {
        for (const child of objs.children) {
          const found = findObjectByLabel(child, label)
          if (found) return found
        }
      }
    }
  }

  const readVisualizer = (data: any, name: string, map: any) => {
    const obj = findObjectByLabel(data, name)
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

    const schemasMap = map

    const svg = createSvg('.svg-container-pv', width, height, 'pacote')

    d3.select('.svg-container-pv').attr('lastSelected', root.data.name)
    d3.select('.svg-container-pv').attr('lastClicked', '')
    d3.select('.svg-container-pv').attr('lastClass', '')
    d3.select('.svg-container-pv').attr(
      'rootName',
      root.children?.[0].data.name
    )
    d3.select('.svg-container-pv').on('click', () => {
      showView('package-view', 'system-view')
      annotMetricUpdate(setAnnotationMetric, 'Package View')
      setPackageName(d3.select('.svg-container-sv').attr('lastSelected'))
      updateSelectBoxText('SelectViewBox', 'systemView')
    })

    const node = createNode(svg, root)
    //Initial Zoom
    zoomTo([root.x, root.y, root.r * 2], width, zoomProp, node)

    //Color all circles
    d3.selectAll('circle')
      .attr('stroke', (d: any) => addCircleStroke(d))
      .attr('stroke-dasharray', (d: any) => addCircleDash(d))
      .attr('fill', (d: any) => colorCircles(d, schemasMap))
    //Apply zoom to all circles in this specific view
    svg
      .selectAll('circle')
      .on('click', (event: any, d: any) => {
        if (d.data.type == 'package') {
          d3.select('.svg-container-pv').attr('lastSelected', d.data.name)
          highlightNode('.svg-container-pv', d.data.name)
          zoomProp.focus !== d &&
            (zoom(event, d, zoomProp, svg, node),
            event.stopPropagation(),
            setFocus(d.data.name, '.svg-container-pv'))
          annotMetricUpdate(setAnnotationMetric, 'Package View')
          setPackageName(d.data.name)
        } else if (d.data.type == 'class' || d.data.type == 'interface') {
          zoomProp.focus !== d &&
            (zoom(event, d, zoomProp, svg, node),
            event.stopPropagation(),
            setFocus(d.data.name, '.svg-container-pv'))
          highlightNode('.svg-container-pv', d.data.name)
        } else if (d.data.type == 'annotation') {
          d3.select('.svg-container-pv').attr(
            'lastSelected',
            d.parent.data.name
          )

          d3.select('.svg-container-cv').selectAll('*').remove()
          d3.select('.svg-container-cv').attr(
            'lastSelected',
            d.parent.parent.data.name
          )
          showView('package-view', 'class-view')
          viewTransition(
            String(d3.select('.svg-container-pv').attr('lastSelected')),
            '.svg-container-cv'
          )
          updateSelectBoxText('SelectViewBox', 'classView')
          annotMetricUpdate(setAnnotationMetric, 'Class View')
          setPackageName('Class: ' + d.parent.data.name)
          zoomProp.focus !== d &&
            (zoom(event, d, zoomProp, svg, node),
            event.stopPropagation(),
            setFocus(d.parent.data.name, '.svg-container-pv'))
        }
      })
      .on('mouseover', (event: any, d: any) => {
        createPopUp(d, event, annotationMetric)
        const name = d.data.properties.schema
        d3.select('.svg-container-pv')
          .selectAll('circle')
          .each(function () {
            if (d3.select(this).attr('schema') == name) {
              const color = d3.select(this).style('fill')
              d3.select('tbody')
                .selectAll('td')
                .each(function () {
                  if (
                    d3.select(this).attr('class') == 'td-schema' &&
                    d3.select(this).attr('name') == name
                  ) {
                    d3.select(this).style('color', color)
                  }
                })
            }
          })
      })
      .on('mouseout', (event, d: any) => {
        destroyPopUp()
        const name = d.data.properties.schema
        d3.select('.svg-container-pv')
          .selectAll('circle')
          .each(function () {
            if (d3.select(this).attr('schema') == name) {
              d3.select('tbody')
                .selectAll('td')
                .each(function () {
                  if (
                    d3.select(this).attr('class') == 'td-schema' &&
                    d3.select(this).attr('name') == name
                  ) {
                    d3.select(this).style('color', 'black')
                  }
                })
            }
          })
      })
      .on('mousemove', (event, d: any) => movePopUp(d, event, annotationMetric))
      .on('contextmenu', (event, d) => {
        event.preventDefault()
      })
  }

  useEffect(() => {
    // readVisualizer(data)
  }, [])

  return (
    <div className="tooltip-container">
      <div className="svg-container-pv"></div>
    </div>
  )
}
