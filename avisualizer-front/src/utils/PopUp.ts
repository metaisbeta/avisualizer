import * as d3 from 'd3'

type DataProps = {
  name: string
  type: string
  value: number
  properties: {
    anl: string
    locad: string
    aa: string
  }
}

type dProps = {
  data: DataProps
  parent: {
    data: DataProps
    parent: {
      data: DataProps
      parent: {
        data: DataProps
      }
    }
  }
}

type EventProps = {
  pageX: number
  pageY: number
}

export function createPopUp(d: dProps, event: EventProps, annotMetric: string) {
  const pvPropertiesSize = 1
  const popUpTransition = 200

  let label = ''

  if (d.data.type === 'schema') {
    label = `
        <b>Schema Name:</b> ${d.data.name}<br/>
        <b>Package Name:</b> ${d.parent.data.name}<br/>
        <b>Number of Annotation Occurrence:</b> ${d.data.value}
      `
  } else if (
    d.data.type === 'annotation' &&
    (d.parent.data.type === 'class' || d.parent.data.type === 'interface')
  ) {
    const classname = d.parent.data.name.split('.')
    const metrics = d3.select('#annotMetric').text().split(' ')
    let metric = ''
    let data

    if (metrics[metrics.length - 1] === '(ANL)') {
      metric = 'ANL'
      data = d.data.properties.anl
    } else if (metrics[metrics.length - 1] === '(LOCAD)') {
      metric = 'LOCAD'

      if (Object.keys(d.data.properties).length === pvPropertiesSize) {
        data = d.data.value
      } else data = d.data.properties.locad
    } else {
      metric = 'AA'
      data = d.data.properties.aa
    }

    label = `
        <b>Package Name:</b> ${d.parent.parent.parent.data.name}<br/> 
        <b>Class Name:</b> ${classname[classname.length - 1]}<br/> 
        <b>Annotation name:</b> ${d.data.name}<br/>
        <b>${metric}:</b> ${data}
      `
  } else if (
    d.data.type == 'annotation' &&
    (d.parent.data.type == 'field' || d.parent.data.type == 'method')
  ) {
    const componentname = d.parent.data.name.split('.')
    const classname = d.parent.parent.data.name.split('.')
    const metrics = annotMetric.split(' ')

    let metric = ''
    let data

    if (metrics[metrics.length - 1] === '(ANL)') {
      metric = 'ANL'
      data = d.data.properties.anl
    } else if (metrics[metrics.length - 1] === '(LOCAD)') {
      metric = 'LOCAD'
      data = d.data.properties.locad
    } else {
      metric = 'AA'
      data = d.data.properties.aa
    }

    label = `
        <b>Package Name:</b> ${d.parent.parent.parent.data.name}<br/>
        <b>Class Name:</b> ${classname[classname.length - 1]}<br/>
        <b>${d.parent.data.type} 
        Name</b>: ${componentname[componentname.length - 1]}<br/> 
        <b>Annotation Name:</b> ${d.data.name}</br> 
        <b>${metric}:</b> ${data} 
      `
  } else if (d.data.type == 'class' || d.data.type == 'interface') {
    const classname = d.data.name.split('.')

    label = `<b>${d.data.type} Name:</b> ${classname[classname.length - 1]}`
  }

  if (label)
    d3.select('.tooltip-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 1)
      .style('left', event.pageX + 8 + 'px')
      .style('top', event.pageY + 'px')
      .style('padding', '8px')
      .style('font-size', '14px')
      .style('text-align', 'start')
      .style('border-radius', '4px')
      .style('position', 'absolute')
      .style('background-color', '#BDD9F2')
      .style('z-index', 1000)
      .html(label)
      .transition()
      .duration(popUpTransition)

  const element: any = document.getElementById(`schema-${d.data.name}`)

  if (element) element.style.background = 'rgba(4, 104, 191, 0.1)'
}

export function destroyPopUp() {
  d3.selectAll('.tooltip').remove()

  const elements: any = document.getElementsByClassName('schema')

  for (const element of elements) {
    element.style.background = '#FAFAFA'
  }
}

export function movePopUp(d: dProps, event: EventProps, annotMetric: string) {
  destroyPopUp()

  createPopUp(d, event, annotMetric)
}
