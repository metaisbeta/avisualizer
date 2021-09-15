/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3'

export function addCircleStroke(node: any): string {
  if (node.data.type === 'package') return '#393939'
  else return '#005AA8'
}

export function addCircleDash(node: any): string {
  if (node.data.type == 'package') return '5,5'
  else return ''
}

export function colorCircles(
  node: any,
  schemasMap: Map<string, string>
): string {
  if (node.data.type === 'package') return '#E9E9E9'
  else if (node.data.type === 'annotation')
    return schemasMap.get(node.data.properties.schema) ?? ''
  else if (node.data.type === 'schema')
    return schemasMap.get(node.data.name) ?? ''
  else if (node.data.type === 'method') return '#C4C4C4'
  else if (node.data.type === 'field') return '#E3E3E3'
  else return '#FAFAFA'
}

export function highlightNode(container: any, name: string) {
  const transitionDur = 150

  d3.select(container)
    .selectAll('circle')
    .each(function () {
      //var splitter = String(d3.select(this).attr("name").split(".");
      if (
        String(d3.select(this).attr('name')) ===
        String(d3.select(container).attr('highlightedNode'))
      ) {
        if (d3.select(this).attr('class') === 'package')
          d3.select(this).style('stroke', 'black')
        else d3.select(this).style('stroke', 'blue')
        d3.select(this).style('stroke-width', '1px')
        d3.select(this).style('fill', '')
      }
    })
  d3.select(container)
    .selectAll('circle')
    .each(function () {
      if (String(d3.select(this).attr('name')) === name) {
        d3.select(container).attr(
          'highlightedNode',
          String(d3.select(this).attr('name'))
        )

        d3.select(this).style('stroke', 'blue')
        d3.select(this).style('stroke-width', '2px')
        const color = d3.select(this).style('fill')
        d3.select(this)
          .transition()
          .duration(transitionDur)
          .style('fill', 'gray')
          .transition()
          .duration(transitionDur)
          .style('fill', String(d3.color(color)?.formatHex()))

        if (d3.select(this).attr('class') === 'package')
          d3.select(this).style('stroke', 'black')
        else d3.select(this).style('stroke', 'blue')
        d3.select(this).style('stroke-width', '1px')
      }
    })
}
