import * as d3 from 'd3'

type DefaultProps = {
  type: string
  name: string
  value: number
  properties: {
    schema: string
  }
}

type DataProps = {
  data: DefaultProps
  parent: {
    data: DefaultProps
    parent: {
      data: DefaultProps
      parent: { data: DefaultProps }
    }
  }
}

export function createSvg(
  classNameContainer: string,
  width: number,
  height: number,
  name: string
) {
  return d3
    .select(classNameContainer)
    .append('svg')
    .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
    .attr('width', width)
    .attr('height', height)
    .attr('name', name)
    .attr('highlightedNode', '')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('display', 'block')
    .style('margin', '0 0')
    .style('background', '#F2F2F2')
    .style('cursor', 'pointer')
}

export function createNode(svg: any, root: any) {
  return svg
    .append('g')
    .selectAll('circle')
    .data(root.descendants())
    .join('circle')
    .attr('class', (d: DataProps) => d.data.type)
    .attr('name', (d: DataProps) => d.data.name)
    .attr('schema', (d: DataProps) =>
      d.data.type == 'annotation' ? d.data.properties.schema : d.data.type
    )
    .attr('zoom', 'a')
    .attr('value', (d: DataProps) =>
      d.data.type == 'schema' ? d.data.value : 0
    )
    .attr('parent', (d: DataProps) =>
      d.parent === null ? '' : d.parent.data.name
    )
    .attr('grandfather', (d: DataProps) => {
      if (d.parent === null || d.parent?.parent === null) {
        return ''
      } else {
        return d.parent.parent.data.name
      }
    })
    .attr('grandgrandfather', (d: DataProps) => {
      if (
        d.parent === null ||
        d.parent?.parent === null ||
        d.parent?.parent?.parent == null
      ) {
        return ''
      } else {
        return d.parent.parent.parent.data.name
      }
    })
}

export function hideAnnotations(container: string, id: string, show: boolean) {
  let view = ''

  if (container === 'systemView') view = '.svg-container-sv'
  else if (container === 'packageView') view = '.svg-container-pv'
  else view = '.svg-container-cv'

  d3.select(view)
    .selectAll('circle')
    .each(function () {
      if (d3.select(this).attr('name') === id) {
        // schema se for package name se for system
        if (!show) d3.select(this).style('visibility', 'hidden')
        else d3.select(this).style('visibility', 'visible')
      }
    })
}

export function showView(origin: string, view: string) {
  d3.select(view).attr('hidden', null)
  d3.select(origin).attr('hidden', '')
}

// View related methods
export function viewTransition(origin: string, view: string) {
  d3.select(view)
    .selectAll('circle')
    .each(function () {
      if (d3.select(this).attr('name') === origin) {
        d3.select(this).dispatch('click')
        setFocus(origin, view)
        return this
      }
    })
}

export function setFocus(toZoom: string, view: string) {
  d3.select(view).attr('lastSelected', toZoom)
}

export function hide(container: string, name: string) {
  d3.select(container)
    .selectAll('circle')
    .each(function () {
      if (container == '.svg-container-pv') {
        if (
          (d3.select(this).attr('class') == 'class' ||
            d3.select(this).attr('class') == 'interface') &&
          d3.select(this).attr('parent').includes(name)
        ) {
          d3.select(this).style('visibility', 'visible')
        } else if (d3.select(this).attr('name').includes(name)) {
          d3.select(this).style('visibility', 'visible')
        } else if (
          d3.select(this).attr('class') == 'annotation' &&
          d3.select(this).attr('grandfather').includes(name)
        ) {
          d3.select(this).style('visibility', 'visible')
        } else if (
          d3.select(this).attr('name') == d3.select(container).attr('rootName')
        ) {
          d3.select(this).style('visibility', 'visible')
        } else {
          d3.select(this).style('visibility', 'hidden')
        }
      } else if (container == '.svg-container-cv') {
        const split = name.split('.')
        let pacote = ''

        for (let i = 0; i < split.length - 1; i++) {
          if (i < split.length - 2) {
            pacote = pacote + split[i] + '.'
          } else {
            pacote = pacote + split[i]
          }
        }

        const classElement = d3.select(this).attr('class')
        const nameElement = d3.select(this).attr('name')
        const parentElement = d3.select(this).attr('parent')
        const grandfatherElement = d3.select(this).attr('grandfather')

        const element = d3.select(this)

        if (
          (classElement === 'class' || classElement === 'interface') &&
          nameElement === name
        ) {
          element.style('visibility', 'visible')
        } else if (parentElement === name) {
          element.style('visibility', 'visible')
        } else if (
          classElement === 'annotation' &&
          grandfatherElement === name
        ) {
          element.style('visibility', 'visible')
        } else if (nameElement === d3.select(container).attr('rootName')) {
          element.style('visibility', 'visible')
        } else if (
          classElement === 'field' ||
          (classElement === 'method' && grandfatherElement === name)
        ) {
          element.style('visibility', 'visible')
        } else if (nameElement === pacote) {
          element.style('visibility', 'visible')
        } else {
          element.style('visibility', 'hidden')
        }
      }
    })
}

export function hideAllCircles(container: string) {
  d3.select(container)
    .selectAll('circle')
    .each(function () {
      if (container === '.svg-container-sv') {
        if (d3.select(this).attr('class') === 'schema') {
          // schema se for package name se for system
          d3.select(this).style('visibility', 'hidden')
        }
      } else {
        if (d3.select(this).attr('class') === 'annotation') {
          // schema se for package name se for system
          d3.select(this).style('visibility', 'hidden')
        }
      }
    })
}

export function displayAllCircles(container: string) {
  d3.select(container)
    .selectAll('circle')
    .each(function () {
      if (container === '.svg-container-sv') {
        if (d3.select(this).attr('class') === 'schema') {
          // schema se for package name se for system
          d3.select(this).style('visibility', 'visible')
        }
      } else {
        if (
          d3.select(this).attr('class') === 'annotation' &&
          (d3
            .select(this)
            .attr('parent')
            .includes(d3.select('.svg-container-sv').attr('lastSelected')) ||
            d3.select(this).attr('name') ===
              d3.select('.svg-container-sv').attr('lastSelected'))
        ) {
          // schema se for package name se for system
          d3.select(this).style('visibility', 'visible')
        }
      }
    })
}

// Hide circles for system-view
export function hideCircles(id: string, show: boolean) {
  if (d3.selectAll('system-view').attr('hidden') !== '') {
    const view = d3.selectAll('.svg-container-sv').select('svg')

    view.selectAll('circle').each(function () {
      if (d3.select(this).attr('name') === id) {
        // Schema se for package name se for system
        if (!show) d3.select(this).style('visibility', 'hidden')
        else d3.select(this).style('visibility', 'visible')
      }
    })
  } else if (
    d3.selectAll('system-view').attr('hidden') === '' &&
    d3.selectAll('class-view').attr('hidden') === ''
  ) {
    const view = d3.selectAll('.svg-container-pv').select('svg')

    view.selectAll('circle').each(function () {
      if (
        d3.select(this).attr('schema') === id &&
        d3
          .select(this)
          .attr('grandfather')
          .includes(d3.select('.svg-container-sv').attr('lastSelected'))
      ) {
        // Schema se for package name se for system
        if (!show) d3.select(this).style('visibility', 'hidden')
        else d3.select(this).style('visibility', 'visible')
      }
    })
  } else if (
    d3.selectAll('system-view').attr('hidden') === '' &&
    d3.selectAll('package-view').attr('hidden') === ''
  ) {
    const view = d3.selectAll('.svg-container-cv').select('svg')

    view.selectAll('circle').each(function () {
      if (
        d3.select(this).attr('schema') === id &&
        (d3.select(this).attr('grandgrandfather') ===
          d3.select('.svg-container-pv').attr('lastSelected') ||
          d3.select(this).attr('grandfather') ===
            d3.select('.svg-container-pv').attr('lastSelected'))
      ) {
        if (!show) d3.select(this).style('visibility', 'hidden')
        else d3.select(this).style('visibility', 'visible')
      }
    })
  }
}

export function resetView(viewToUpdate: string) {
  const view = d3.selectAll(viewToUpdate).select('svg')

  view.selectAll('circle').each(function () {
    if (
      d3
        .select(this)
        .attr('parent')
        .includes(d3.select('.svg-container-sv').attr('lastSelected'))
    ) {
      d3.select(this).style('visibility', 'visible')
    } else if (d3.select(this).attr('class') === 'schema') {
      d3.select(this).style('visibility', 'visible')
    }
  })

  d3.select('#schemas-table')
    .selectAll('input')
    .each(function () {
      if (d3.select(this).attr('id') !== 'UnselectAllBox')
        d3.select(this).property('checked', true)
      else d3.select(this).property('checked', false)
    })
}
