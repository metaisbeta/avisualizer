import * as d3 from 'd3'
let annotationsVisible = true
export function visible() {
  d3.select('#hide-annotations-btn').on('click', function () {
    annotationsVisible = !annotationsVisible
    //console.log(annotationsVisible)
    d3.select('.svg-container-sv')
      .selectAll('circle')
      .filter((d: any) => d.data.type === 'schema')
      .style('display', annotationsVisible ? 'block' : 'none')
    d3.select('.svg-container-pv')
      .selectAll('circle')
      .filter((d: any) => d.data.type === 'annotation')
      .style('display', annotationsVisible ? 'block' : 'none')
    d3.select('.svg-container-cv')
      .selectAll('circle')
      .filter((d: any) => d.data.type === 'annotation')
      .style('display', annotationsVisible ? 'block' : 'none')
    d3.select(this as HTMLButtonElement).text(
      annotationsVisible ? 'Hide annotations' : 'Show annotations'
    )
  })

  // Containers to show
}
