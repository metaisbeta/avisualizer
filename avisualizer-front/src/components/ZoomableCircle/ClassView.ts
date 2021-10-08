import * as d3 from 'd3'

import { annotMetricUpdate } from '../../utils/AnnotationMetric'
import { annotationSchemas } from '../../utils/AnnotationSchemas'
import {
  addCircleDash,
  addCircleStroke,
  colorCircles,
  highlightNode
} from '../../utils/Circle'
import { createPopUp, destroyPopUp, movePopUp } from '../../utils/PopUp'
import {
  createNode,
  createSvg,
  hide,
  resetView,
  setFocus
} from '../../utils/SVG'
import { zoom, zoomTo } from '../../utils/Zoom'

export const ClassVisualizer = (
  data: any,
  metric: number,
  lastSelected: string,
  width: number,
  height: number,
  setTypeAnnotation: (annot: string) => void,
  annotationMetric: string,
  setAnnotationMetric: (annot: string) => void,
  setPackageName: (name: string) => void
) => {
  const zoomProp: { focus: any } = { focus: null }

  const root: any = d3.hierarchy(data)

  let typeMetric = ''

  if (metric === 0) typeMetric = 'aa'
  else if (metric === 1) typeMetric = 'anl'
  else typeMetric = 'locad'

  root
    .sum(
      (d: {
        value: number
        type: string
        properties: Record<string, string>
      }) => {
        if (d.type === 'annotation')
          d.value = parseInt(d.properties[typeMetric]) + 1
        else if (isNaN(d.value)) d.value = 0
      }
    )
    .sort((a: { value: number }, b: { value: number }) => {
      b.value - a.value
    })
    .sum((d: { value: number }) => d.value)

  const pack = d3
    .pack()
    .size([width - 2, height - 10])
    .padding(3)

  pack(root)

  zoomProp.focus = root

  const { schemasColorMap } = annotationSchemas(root, 'class')

  const svg = createSvg('.svg-container-cv', width, height, 'classe')

  d3.select('.svg-container-cv').attr('lastSelected', lastSelected)
  d3.select('.svg-container-cv').attr('rootName', root.data.name)

  const node = createNode(svg, root)

  //Initial Zoom
  zoomTo([root.x, root.y, root.r * 2], width, zoomProp, node)

  //Color all circles
  d3.selectAll('circle')
    .attr('stroke', (d: any) => addCircleStroke(d))
    .attr('stroke-dasharray', (d: any) => addCircleDash(d))
    .attr('fill', (d: any) => colorCircles(d, schemasColorMap))

  svg
    .selectAll('circle')
    .on('click', (event: any, d: any) => {
      if (d.data.type === 'class' || d.data.type === 'interface') {
        zoomProp.focus !== d &&
          (zoom(event, d, zoomProp, svg, node),
          event.stopPropagation(),
          setFocus(d.data.name, '.svg-container-cv'))

        highlightNode('.svg-container-cv', d.data.name)
        d3.select('.svg-container-pv').attr('lastSelected', d.parent.data.name)
      } else if (d.data.type === 'method' || d.data.type === 'field') {
        highlightNode('.svg-container-cv', d.data.name)
      } else if (d.data.type === 'package') {
        setTypeAnnotation('Package View')
        annotMetricUpdate(setAnnotationMetric, 'Package View')
        setPackageName('Package: ' + d.data.name)

        resetView('.svg-container-cv')

        d3.select('.svg-container-pv').attr('lastSelected', d.data.name)
        d3.select('.svg-container-pv')
          .selectAll('circle')
          .each(function () {
            if (
              d3.select(this).attr('name') ===
              d3.select('.svg-container-pv').attr('lastSelected')
            )
              d3.select(this).dispatch('click')
          })
      }
    })
    .on('mouseover', (event: any, d: any) =>
      createPopUp(d, event, annotationMetric)
    )
    .on('mouseout', () => destroyPopUp())
    .on('mousemove', (event, d: any) => movePopUp(d, event, annotationMetric))
    .on('contextmenu', (event) => event.preventDefault())

  d3.select('.svg-container-cv')
    .selectAll('circle')
    .each(function () {
      if (d3.select(this).attr('name') === lastSelected) {
        d3.select(this).dispatch('click')
        setFocus(lastSelected, '.svg-container-cv')
        return this
      }
    })
  hide('.svg-container-cv', lastSelected)
}
