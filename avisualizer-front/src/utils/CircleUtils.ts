import * as d3 from 'd3'

export function addCircleStroke(node: any): string {
  if (node.data.type == 'package') return 'black'
  else return 'blue'
}

export function addCircleDashArray(node: any): string {
  if (node.data.type == 'package') return '5,5'
  else return ''
}

export function colorCircles(node: any, schemasMap: Map<any, any>): string {
  if (node.data.type == 'package') return '#e0dada'
  else if (node.data.type == 'annotation')
    return schemasMap.get(node.data.properties.schema)
  //return "url('#green-pattern')";
  else if (node.data.type == 'schema') return schemasMap.get(node.data.name)
  //return "url('#green-pattern')";
  else if (node.data.type == 'method') return '#D2D2D2'
  else if (node.data.type == 'field') return '#e3e3e3'
  else return 'white'
}
export function highlightNode(container: any, name: string) {
  const transitionDur = 150

  d3.select(container)
    .selectAll('circle')
    .each(function () {
      //var splitter = String(d3.select(this).attr("name").split(".");
      if (
        String(d3.select(this).attr('name')) ==
        String(d3.select(container).attr('highlightedNode'))
      ) {
        if (d3.select(this).attr('class') == 'package')
          d3.select(this).style('stroke', 'black')
        else d3.select(this).style('stroke', 'blue')
        d3.select(this).style('stroke-width', '1px')
        d3.select(this).style('fill', '')
      }
    })
  d3.select(container)
    .selectAll('circle')
    .each(function () {
      if (String(d3.select(this).attr('name')) == name) {
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

        if (d3.select(this).attr('class') == 'package')
          d3.select(this).style('stroke', 'black')
        else d3.select(this).style('stroke', 'blue')
        d3.select(this).style('stroke-width', '1px')
      }
    })
}
