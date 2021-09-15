/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3'

export function createSvg(
  classNameContainer: string,
  width: number,
  height: number,
  name: string
) {
  const svg = d3
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

  return svg
}

export function createNode(svg: any, root: any) {
  const node = svg
    .append('g')
    .selectAll('circle')
    .data(root.descendants())
    .join('circle')
    .attr('class', (d: any) => {
      return d.data.type
    })
    .attr('name', function (d: any) {
      return d.data.name
    })
    .attr('schema', function (d: any) {
      return d.data.type == 'annotation'
        ? d.data.properties.schema
        : d.data.type
    })
    .attr('zoom', 'a')
    .attr('value', function (d: any) {
      return d.data.type == 'schema' ? d.data.value : 0
    })
    .attr('parent', (d: any) => (d.parent === null ? '' : d.parent.data.name))
    .attr('grandfather', (d: any) => {
      if (d.parent === null || d.parent?.parent === null) {
        return ''
      } else {
        return d.parent.parent.data.name
      }
    })
    .attr('grandgrandfather', (d: any) => {
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

  return node
}

export function hideAnnotations(container: string, id: string, show: boolean) {
  let view = ''
  if (container == 'systemView') view = '.svg-container-sv'
  else if (container == 'packageView') view = '.svg-container-pv'
  else view = '.svg-container-cv'

  console.log(id, show, view)
  d3.select(view)
    .selectAll('circle')
    .each(function () {
      if (String(d3.select(this).attr('name')) == id) {
        // schema se for package name se for system

        if (!show) {
          // console.log(d3.select(this).attr("name")+" "+id);
          d3.select(this).style('visibility', 'hidden')
        } else {
          // console.log(d3.select(this).attr("name")+" "+id+" hide");
          d3.select(this).style('visibility', 'visible')
        }
      }
    })
}

export function showView(origin: string, view: string) {
  d3.select(view).attr('hidden', null)
  d3.select(origin).attr('hidden', '')
}
// view related methods
export function viewTransition(origin: any, view: any) {
  //console.log(origin,view)
  d3.select(String(view))
    .selectAll('circle')
    .each(function (d, i) {
      if (String(d3.select(this).attr('name')) == origin) {
        //console.log(d3.select(this).attr('name'))
        d3.select(this).dispatch('click')
        setFocus(origin, view)
        return this
      }
    })
}
export function setFocus(toZoom: any, view: any) {
  d3.select(String(view)).attr('lastSelected', String(toZoom))
}
export function hide(container: string, name: string) {
  d3.select(container)
    .selectAll('circle')
    .each(function (d, i) {
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

        if (
          (d3.select(this).attr('class') == 'class' ||
            d3.select(this).attr('class') == 'interface') &&
          String(d3.select(this).attr('name')) == name
        ) {
          d3.select(this).style('visibility', 'visible')
        } else if (String(d3.select(this).attr('parent')) == name) {
          d3.select(this).style('visibility', 'visible')
        } else if (
          String(d3.select(this).attr('class')) == 'annotation' &&
          String(d3.select(this).attr('grandfather')) == name
        ) {
          d3.select(this).style('visibility', 'visible')
        } else if (
          String(d3.select(this).attr('name')) ==
          d3.select(container).attr('rootName')
        ) {
          d3.select(this).style('visibility', 'visible')
        } else if (
          (String(d3.select(this).attr('class')) == 'field' ||
            String(d3.select(this).attr('class')) == 'method') &&
          String(d3.select(this).attr('grandfather')) == name
        ) {
          d3.select(this).style('visibility', 'visible')
        } else if (d3.select(this).attr('name') == pacote) {
          d3.select(this).style('visibility', 'visible')
        } else {
          d3.select(this).style('visibility', 'hidden')
        }
      }
    })
}
export function hideAllCircles(container: string) {
  d3.select(container)
    .selectAll('circle')
    .each(function (d, i) {
      if (container == '.svg-container-sv') {
        if (String(d3.select(this).attr('class')) == 'schema') {
          // schema se for package name se for system
          d3.select(this).style('visibility', 'hidden')
        }
      } else {
        if (String(d3.select(this).attr('class')) == 'annotation') {
          // schema se for package name se for system
          d3.select(this).style('visibility', 'hidden')
        }
      }
    })
}
export function displayAllCircles(container: string) {
  d3.select(container)
    .selectAll('circle')
    .each(function (d, i) {
      if (container == '.svg-container-sv') {
        if (String(d3.select(this).attr('class')) == 'schema') {
          // schema se for package name se for system
          d3.select(this).style('visibility', 'visible')
        }
      } else {
        if (
          String(d3.select(this).attr('class')) == 'annotation' &&
          (d3
            .select(this)
            .attr('parent')
            .includes(d3.select('.svg-container-sv').attr('lastSelected')) ||
            d3.select(this).attr('name') ==
              d3.select('.svg-container-sv').attr('lastSelected'))
        ) {
          // schema se for package name se for system
          d3.select(this).style('visibility', 'visible')
        }
      }
    })
}
export function hideCircles(container: string, id: string, show: boolean) {
  if (d3.selectAll('system-view').attr('hidden') !== '') {
    // hide circles for system-view
    const view = d3.selectAll('.svg-container-sv').select('svg')
    view.selectAll('circle').each(function (d, i) {
      if (String(d3.select(this).attr('name')) == id) {
        // schema se for package name se for system
        if (!show) {
          // console.log(d3.select(this).attr("name")+" "+id);
          d3.select(this).style('visibility', 'hidden')
        } else {
          // console.log(d3.select(this).attr("name")+" "+id+" hide");
          d3.select(this).style('visibility', 'visible')
        }
      }
    })
  } else if (
    d3.selectAll('system-view').attr('hidden') == '' &&
    d3.selectAll('class-view').attr('hidden') == ''
  ) {
    const view = d3.selectAll('.svg-container-pv').select('svg')
    view.selectAll('circle').each(function (d, i) {
      if (
        String(d3.select(this).attr('schema')) == id &&
        d3
          .select(this)
          .attr('grandfather')
          .includes(d3.select('.svg-container-sv').attr('lastSelected'))
      ) {
        // schema se for package name se for system
        if (!show) {
          // console.log(d3.select(this).attr("name")+" "+id);
          d3.select(this).style('visibility', 'hidden')
        } else {
          // console.log(d3.select(this).attr("name")+" "+id+" hide");
          d3.select(this).style('visibility', 'visible')
        }
      }
    })
  } else if (
    d3.selectAll('system-view').attr('hidden') == '' &&
    d3.selectAll('package-view').attr('hidden') == ''
  ) {
    const view = d3.selectAll('.svg-container-cv').select('svg')
    view.selectAll('circle').each(function (d, i) {
      //if (String(d3.select(this).attr('schema')) == id && ( d3.select(this).attr('grandfather') == d3.select('#classList').select('select option:checked').attr('value') || d3.select(this).attr('parent') == d3.select('#classList').select('select option:checked').attr('value'))){ // schema se for package name se for system
      if (
        String(d3.select(this).attr('schema')) == id &&
        (d3.select(this).attr('grandgrandfather') ==
          d3.select('.svg-container-pv').attr('lastSelected') ||
          d3.select(this).attr('grandfather') ==
            d3.select('.svg-container-pv').attr('lastSelected'))
      ) {
        if (!show) {
          // console.log(d3.select(this).attr("name")+" "+id);
          d3.select(this).style('visibility', 'hidden')
        } else {
          // console.log(d3.select(this).attr("name")+" "+id+" hide");
          d3.select(this).style('visibility', 'visible')
        }
      }
    })
  }
}

export function resetView(viewToUpdate: any) {
  const view = d3.selectAll(String(viewToUpdate)).select('svg')
  view.selectAll('circle').each(function (d, i) {
    if (
      d3
        .select(this)
        .attr('parent')
        .includes(d3.select('.svg-container-sv').attr('lastSelected'))
    ) {
      d3.select(this).style('visibility', 'visible')
    } else if (d3.select(this).attr('class') == 'schema') {
      d3.select(this).style('visibility', 'visible')
    }
  })
  d3.select('#schemas-table')
    .selectAll('input')
    .each(function (d, i) {
      if (d3.select(this).attr('id') != 'UnselectAllBox')
        d3.select(this).property('checked', true)
      else d3.select(this).property('checked', false)
    })
}
