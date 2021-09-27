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

export const PackageVisualizer = (
  data: any,
  width: number,
  height: number,
  setTypeAnnotation: (annot: string) => void,
  annotationMetric: string,
  setAnnotationMetric: (annot: string) => void,
  setPackageName: (name: string) => void
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

  const { schemasColorMap } = annotationSchemas(root, 'locad')

  const svg = createSvg('.svg-container-pv', width, height, 'pacote')

  d3.select('.svg-container-pv').attr('lastSelected', root.data.name)
  d3.select('.svg-container-pv').attr('lastClicked', '')
  d3.select('.svg-container-pv').attr('lastClass', '')
  d3.select('.svg-container-pv').attr('rootName', root.children?.[0].data.name)

  // d3.select('.svg-container-pv').on('click', () => {
  //   annotMetricUpdate(setAnnotationMetric, 'Package View')
  //   setPackageName(d3.select('.svg-container-sv').attr('lastSelected'))
  //   setTypeAnnotation('System View')
  // })

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
      if (
        d.data.type === 'package' &&
        (d.data.name.includes(
          d3.select('.svg-container-sv').attr('lastSelected')
        ) ||
          d.data.name === d3.select('.svg-container-sv').attr('lastSelected'))
      ) {
        if (d.data.name === root.descendants()[1].data.name) {
          const node = d.descendants()[0].data.children[0].name

          d3.select('.svg-container-pv')
            .selectAll('circle')
            .each(function () {
              if (d3.select(this).attr('name') === node) {
                d3.select(this).dispatch('click')
                return this
              }
            })
          d3.select('.svg-container-sv').attr('lastSelected', node)
        } else {
          zoomProp.focus !== d &&
            (zoom(event, d, zoomProp, svg, node),
            event.stopPropagation(),
            setFocus(d.data.name, '.svg-container-pv'))

          highlightNode('.svg-container-pv', d.data.name)

          d3.select('.svg-container-pv').attr('lastSelected', d.data.name)
          if (
            d.data.name === d3.select('.svg-container-sv').attr('lastSelected')
          ) {
            // refreshBox(
            //   'classList',
            //   'classes',
            //   'Select Class',
            //   'select class',
            //   d.data.name,
            //   '.svg-container-pv',
            //   ''
            // )
            // refreshBox(
            //   'interfaceList',
            //   'interfaces',
            //   'Select Interface',
            //   'select interface',
            //   d.data.name,
            //   '.svg-container-pv',
            //   'interface'
            // )
          }
          annotMetricUpdate(setAnnotationMetric, 'Package View')
          setPackageName('Package: ' + d.data.name)
        }
      } else if (d.data.type === 'class' || d.data.type === 'interface') {
        annotMetricUpdate(setAnnotationMetric, 'Package View')
        setPackageName(
          d.data.type.charAt(0).toUpperCase() +
            d.data.type.slice(1) +
            ': ' +
            d.data.name
        )

        zoomProp.focus !== d &&
          (zoom(event, d, zoomProp, svg, node),
          event.stopPropagation(),
          setFocus(d.parent.data.name, '.svg-container-pv'))

        // if (d.data.type === 'class')
        //   updateSelectBoxText('classList', d.data.name)
        // else updateSelectBoxText('interfaceList', d.data.name)
        highlightNode('.svg-container-pv', d.data.name)
      } else if (
        d.data.type === 'package' &&
        !d3
          .select('.svg-container-sv')
          .attr('lastSelected')
          .includes(d.parent.data.name)
      ) {
        annotMetricUpdate(setAnnotationMetric, 'System View')
        setPackageName('Package: ' + d.data.name)
        setTypeAnnotation('System View')

        // resetBox(
        //   'interfaceList',
        //   'interfaces',
        //   'Select Interface',
        //   'select interface'
        // )
        // resetBox('classList', 'classes', 'Select Class', 'select class')
        // updateSelectBoxText('packagesList', d.data.name)
        d3.select('.svg-container-pv').attr('lastSelected', d.data.name)
      } else if (d.data.type === 'annotation') {
        d3.select('.svg-container-pv').attr('lastClicked', d.data.name)
        d3.select('.svg-container-pv').attr('lastClass', d.parent.data.name)

        highlightNode('.svg-container-sv', d.parent.parent.data.name)

        // if (d.parent.data.type === 'class') {
        //   updateSelectBoxText('classList', d.parent.data.name)
        // } else {
        //   updateSelectBoxText('interfaceList', d.parent.data.name)
        // }

        zoomProp.focus !== d &&
          (zoom(event, d, zoomProp, svg, node),
          event.stopPropagation(),
          setFocus(String(d.parent.data.name), '.svg-container-pv'))
        hide('.svg-container-cv', d.parent.data.name)
        setTypeAnnotation('Class View')

        viewTransition(
          String(d3.select('.svg-container-pv').attr('lastSelected')),
          '.svg-container-cv'
        )
        // refreshBox(
        //   'fieldList',
        //   'fields',
        //   'Select Field',
        //   'select field',
        //   d.parent.data.name,
        //   '.svg-container-cv',
        //   'field'
        // )
        // refreshBox(
        //   'methodList',
        //   'methods',
        //   'Select Method',
        //   'select method',
        //   d.parent.data.name,
        //   '.svg-container-cv',
        //   'method'
        // )

        d3.select('.svg-container-pv').attr(
          'lastSelected',
          d.parent.parent.data.name
        )

        annotMetricUpdate(setAnnotationMetric, 'Class View')
        setPackageName('Class: ' + d.parent.data.name)

        resetView('.svg-container-pv')

        setTypeAnnotation('Class View')
        // updateSelectBoxText('packagesList', d.parent.parent.data.name)
      } else {
        highlightNode('.svg-container-sv', d.data.name)

        zoomProp.focus !== d &&
          (zoom(event, d, zoomProp, svg, node),
          event.stopPropagation(),
          setFocus(d.data.name, '.svg-container-sv'))

        annotMetricUpdate(setAnnotationMetric, 'Package View')
        setPackageName('Package: ' + d.data.name)
      }
    })
    .on('mouseover', (event: any, d: any) =>
      createPopUp(d, event, annotationMetric)
    )
    .on('mouseout', () => destroyPopUp())
    .on('mousemove', (event, d: any) => movePopUp(d, event, annotationMetric))
    .on('contextmenu', (event) => event.preventDefault())
}
