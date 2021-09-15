/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3'

export function zoom(event: any, d: any, zoomProp: any, svg: any, node: any) {
  if (
    d.data.type == 'annotation' ||
    d.data.type == 'schema' ||
    d.data.type == 'method' ||
    d.data.type == 'field'
  )
    return
  zoomProp.focus = d

  svg
    .transition()
    .duration(event.altKey ? 7500 : 0)
    .tween('zoom', () => {
      const i = d3.interpolateZoom(zoomProp.view, [
        zoomProp.focus.x,
        zoomProp.focus.y,
        zoomProp.focus.r * 2
      ])

      return (t: any) => zoomTo(i(t), svg, zoomProp, node)
    })
}

export function zoomTo(v: number[], width: number, zoomProp: any, node: any) {
  const k = width / v[2]
  zoomProp.view = v

  node.attr(
    'transform',
    (d: any) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
  )
  node.attr('r', (d: any) => d.r * k)
}
