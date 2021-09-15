import * as d3 from 'd3'

import { highlightNode } from './Circle'

export function getPackagesName(svg: any): string[] {
  const names: string[] = []
  svg.selectAll('circle').each((d: any) => {
    if (d.data.type == 'package' && d.data.children.length > 0) {
      names.push(d.data.name)
    }
  })
  return names
}
export function getClassName(svg: any, pacote: string, div: string): string[] {
  const names: string[] = []
  svg.selectAll('circle').each((d: any) => {
    if (div == 'classes') {
      if (d.data.type == 'class' && d.data.children.length > 0) {
        //var split =d.data.name.split(".");
        if (d.parent.data.name.includes(pacote)) names.push(d.data.name)
      }
    } else if (div == 'interfaces') {
      if (d.data.type == 'interface' && d.data.children.length > 0) {
        //var split =d.data.name.split(".");
        if (d.parent.data.name.includes(pacote)) names.push(d.data.name)
      }
    }
  })
  return names
}
export function getElementName(
  svg: any,
  classe: string,
  element: string
): string[] {
  const names: string[] = []
  svg.selectAll('circle').each((d: any) => {
    if (d.data.type == element) {
      //var split =d.data.name.split(".");
      if (d.parent.data.name == classe) names.push(d.data.name)
    }
  })
  return names
}

export function createSelectBox(
  divName: string,
  selectBoxId: string,
  defaultBoxText: string,
  defaultBoxValue: string,
  label: string,
  top: number,
  width: number,
  svg: string
) {
  d3.select('body')
    .append('div')
    .attr('id', divName)
    .attr('class', 'nav-bar')
    .style('position', 'fixed')
    .style('left', 0 + 'px')
    .style('top', top + 'px')
    .style('background-color', '#fff')
    .style('width', 400)
    .style('overflow', 'auto')
    .append('h5')
    .html(label + ' <br/>')
    .append('select')
    .attr('id', selectBoxId)
    .attr('label', label)
    .style('width', '20vw')
    .style('left', '5vw')
  d3.select('#' + divName)
    .select('select')
    .append('option')
    .text(defaultBoxText)
    .attr('value', defaultBoxText)
  if (svg == '.svg-container-sv') {
    const options = getPackagesName(d3.select(svg))
    //console.log(options);
    insertOptions('.svg-container-sv', divName, selectBoxId, options)
  }
  d3.select('#' + selectBoxId).on('change', () => {
    if (
      d3
        .select('#' + divName)
        .select('select option:checked')
        .attr('value') == 'Select Package'
    ) {
      highlightNode('.svg-container-sv', 'select package')
    } else if (
      d3
        .select('#' + divName)
        .select('select option:checked')
        .attr('value') == 'Select Class'
    ) {
      highlightNode('.svg-container-pv', 'select class')
    } else if (
      d3
        .select('#' + divName)
        .select('select option:checked')
        .attr('value') == 'Select Method'
    ) {
      highlightNode('.svg-container-cv', 'select method')
    } else if (
      d3
        .select('#' + divName)
        .select('select option:checked')
        .attr('value') == 'Select Field'
    ) {
      highlightNode('.svg-container-cv', 'select field')
    } else if (
      d3
        .select('#' + divName)
        .select('select option:checked')
        .attr('value') == 'Select Interface'
    ) {
      highlightNode('.svg-container-pv', 'select interface')
    }
    d3.select(svg)
      .selectAll('circle')
      .each(function () {
        if (
          d3.select(this).attr('name') ==
          d3
            .select('#' + divName)
            .select('select option:checked')
            .attr('value')
        ) {
          d3.select(this).dispatch('click')
        }
      })
  })
}

export function insertOptions(
  svg: string,
  div: string,
  boxId: string,
  options: string[]
) {
  options.sort()
  if (svg == '.svg-container-sv' || svg == '.svg-container-cv') {
    for (let i = 0; i < options.length; i++) {
      d3.select('#' + div)
        .select('select')
        .append('option')
        .text(options[i])
        .attr('value', options[i])
    }
  } else {
    for (let i = 0; i < options.length; i++) {
      const text = options[i].split('.')
      d3.select('#' + div)
        .select('select')
        .append('option')
        .text(text[text.length - 1])
        .attr('value', options[i])
    }
  }
}

export function refreshBox(
  boxName: string,
  divName: string,
  defaultBoxText: string,
  defaultValue: string,
  element: string,
  container: string,
  component: string
) {
  d3.select('#' + boxName)
    .selectAll('option')
    .remove()
  d3.select('#' + divName)
    .select('select')
    .append('option')
    .text(defaultBoxText)
    .attr('value', defaultValue)
  let options: string[] = []
  if (divName == 'fields' || divName == 'methods')
    options = getElementName(d3.select(container), element, component)
  else if (divName == 'classes' || divName === 'interfaces')
    options = getClassName(d3.select(container), element, divName)
  insertOptions(container, divName, boxName, options)
}
export function resetBox(
  boxName: string,
  divName: string,
  defaultBoxText: string,
  defaultValue: string
) {
  d3.select('#' + boxName)
    .selectAll('option')
    .remove()
  d3.select('#' + divName)
    .select('select')
    .append('option')
    .text(defaultBoxText)
    .attr('value', defaultValue)
}

export function updateSelectBoxText(boxName: string, option: string) {
  d3.select('#' + boxName)
    .selectAll('option')
    .each(function () {
      //console.log(d3.select(this).attr("value"))
      if (d3.select(this).attr('value') == option) {
        //console.log(d3.select(this).attr("value"))
        return d3.select(this).property('selected', true)
      }
    })
}
