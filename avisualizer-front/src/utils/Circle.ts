import * as d3 from 'd3'

type NodeProps = {
  data: {
    name: string
    type: string
    annotation: any
    properties: {
      schema: string
    }
  }
}

export function addCircleStroke(node: NodeProps): string {
  if (node?.data?.type === 'package') return '#393939'
  else if (node?.data?.type === 'convention') return 'gold'
  else return '#005AA8'
}

export function addCircleDash(node: any): string {
  if (node?.data?.type == 'package') return '5,5'
  else if (node?.data?.type == 'convention') return '4'
  else return ''
}

export function colorCircles(
  node: NodeProps,
  schemasMap: Map<string, string>
): string {
  if (node?.data?.type === 'package') return '#E9E9E9'
  else if (node?.data?.type === 'annotation')
    return schemasMap.get(node?.data?.properties?.schema) ?? ''
  else if (node?.data?.type === 'schema' || node?.data?.type === 'convention') {
    console.log(node.data?.type, schemasMap.get(node?.data?.properties.schema))
    return (
      (schemasMap.get(node?.data?.name) ||
        schemasMap.get(node?.data?.properties.schema)) ??
      '#000000'
    )
  } else if (node?.data?.type === 'method') return '#C4C4C4'
  else if (node?.data?.type === 'field') return '#E3E3E3'
  else return '#FAFAFA'
}

export function pulse(
  selection: d3.Selection<d3.BaseType, any, any, any>
): void {
  selection
    .transition()
    .duration(800)
    .attr('opacity', 0.2)
    .transition()
    .duration(800)
    .attr('opacity', 1)
    .on('end', function () {
      pulse(d3.select(this))
    })
}

export function highlightNode(container: string, name: string) {
  const transitionDur = 150

  d3.select(container)
    .selectAll('circle')
    .each(function () {
      const element = d3.select(this)

      if (
        element.attr('name') === d3.select(container).attr('highlightedNode')
      ) {
        if (element.attr('class') === 'package')
          element.style('stroke', '#393939')
        else element.style('stroke', '#005AA8')

        element.style('stroke-width', '1px')
        element.style('fill', '')
      }
    })

  d3.select(container)
    .selectAll('circle')
    .each(function () {
      const element = d3.select(this)

      if (element.attr('name') === name) {
        d3.select(container).attr('highlightedNode', element.attr('name'))

        element.style('stroke', '#005AA8')
        element.style('stroke-width', '2px')

        const color = element.style('fill')

        element
          .transition()
          .duration(transitionDur)
          .style('fill', '#ABABAB')
          .transition()
          .duration(transitionDur)
          .style('fill', d3.color(color)?.formatHex() ?? '')

        if (element.attr('class') === 'package')
          element.style('stroke', '#393939')
        else element.style('stroke', '#005AA8')

        element.style('stroke-width', '2px')
      }
    })
}
