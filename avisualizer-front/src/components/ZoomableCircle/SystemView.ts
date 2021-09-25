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
  setFocus,
  viewTransition
} from '../../utils/SVG'
import { zoom, zoomTo } from '../../utils/Zoom'
import { PackageVisualizer } from './PackageView'

export const SystemVisualizer = (
  data: any,
  width: number,
  height: number,
  packageData: any,
  setTypeAnnotation: (type: string) => void,
  annotationMetric: string,
  setAnnotationMetric: (annot: string) => void,
  setPackageName: (name: string) => void,
  setSchemasColorMap: (colors: Map<string, string>) => void
) => {
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

  const { schemasColorMap } = annotationSchemas(
    d3.hierarchy(packageData),
    'package'
  )

  const svg = createSvg('.svg-container-sv', width, height, 'sistema')

  d3.select('.svg-container-sv').attr(
    'lastSelected',
    root.descendants()[1].data.name
  )

  d3.select('.svg-container-sv').attr('rootName', root.children?.[0].data.name)

  const node = createNode(svg, root)

  zoomTo([root.x, root.y, root.r * 2], width, zoomProp, node)

  annotMetricUpdate(setAnnotationMetric, 'System View')
  setPackageName('Package: ' + root.children[0].data.name)

  // Circle stylization
  d3.select('.svg-container-sv')
    .selectAll('circle')
    .attr('stroke', (d: any) => addCircleStroke(d))
    .attr('stroke-dasharray', (d: any) => addCircleDash(d))
    .attr('fill', (d: any) => colorCircles(d, schemasColorMap))

  svg
    .selectAll('circle')
    .on('click', (event, d: any) => {
      // Apply zoom to all circles in this specific view
      if (d.data.type === 'schema') {
        hide('.svg-container-pv', d.parent.data.name)
        highlightNode('.svg-container-sv', d.parent.data.name)

        PackageVisualizer(
          packageData,
          width,
          height,
          schemasColorMap,
          setTypeAnnotation,
          annotationMetric,
          setAnnotationMetric,
          setPackageName
        )

        zoomProp.focus !== d &&
          (zoom(event, d, zoomProp, svg, node),
          event.stopPropagation(),
          setFocus(d.parent.data.name, '.svg-container-sv'))

        viewTransition(
          d3.select('.svg-container-sv').attr('lastSelected'),
          '.svg-container-pv'
        )
        resetView('.svg-container-sv')

        annotMetricUpdate(setAnnotationMetric, 'Package View')
        setPackageName(d.parent.data.name)
        setSchemasColorMap(schemasColorMap) // To package view
        setTypeAnnotation('Package View')
      } else {
        highlightNode('.svg-container-sv', d.data.name)

        zoomProp.focus !== d &&
          (zoom(event, d, zoomProp, svg, node),
          event.stopPropagation(),
          setFocus(d.data.name, '.svg-container-sv'))

        annotMetricUpdate(setAnnotationMetric, 'System View')
        setPackageName(d.data.name)
      }
    })
    .on('mouseover', (event, d: any) => createPopUp(d, event, annotationMetric))
    .on('mouseout', () => destroyPopUp())
    .on('mousemove', (event, d: any) => movePopUp(d, event, annotationMetric))
    .on('contextmenu', (event) => {
      event.preventDefault()
    })
}
