import * as d3 from 'd3'

import { highlightNode } from './Circle'

type DefaultProps = {
  type: string
  name: string
  value: number
  children: string[]
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

export function getPackagesName(svg: any): string[] {
  const names: string[] = []

  svg.selectAll('circle').each((d: DataProps) => {
    if (d.data.type === 'package' && d.data.children.length > 0) {
      names.push(d.data.name)
    }
  })

  return names
}

export function getClassName(svg: any, pacote: string, div: string): string[] {
  const names: string[] = []

  svg.selectAll('circle').each((d: DataProps) => {
    if (div === 'classes') {
      if (d.data.type === 'class' && d.data.children.length > 0) {
        if (d.parent.data.name.includes(pacote)) names.push(d.data.name)
      }
    } else if (div === 'interfaces') {
      if (d.data.type === 'interface' && d.data.children.length > 0) {
        if (d.parent.data.name.includes(pacote)) names.push(d.data.name)
      }
    }
  })

  return names
}

export function getElementName(
  svg: any,
  name: string,
  element: string
): string[] {
  const names: string[] = []

  svg.selectAll('circle').each((d: DataProps) => {
    if (d.data.type === element)
      if (d.parent.data.name === name) names.push(d.data.name)
  })

  return names
}

export function createSelectBox(
  divName: string,
  selectBoxId: string,
  defaultBoxText: string,
  label: string,
  top: number,
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
    insertOptions('.svg-container-sv', divName, options)
  }

  d3.select('#' + selectBoxId).on('change', () => {
    const element = d3.select('#' + divName).select('select option:checked')

    if (element.attr('value') === 'Select Package')
      highlightNode('.svg-container-sv', 'select package')
    else if (element.attr('value') === 'Select Class')
      highlightNode('.svg-container-pv', 'select class')
    else if (element.attr('value') === 'Select Method')
      highlightNode('.svg-container-cv', 'select method')
    else if (element.attr('value') === 'Select Field')
      highlightNode('.svg-container-cv', 'select field')
    else if (element.attr('value') === 'Select Interface')
      highlightNode('.svg-container-pv', 'select interface')

    d3.select(svg)
      .selectAll('circle')
      .each(function () {
        if (d3.select(this).attr('name') === element.attr('value'))
          d3.select(this).dispatch('click')
      })
  })
}

export function insertOptions(name: string, div: string, options: string[]) {
  options.sort()

  const isSVorCV = name === '.svg-container-sv' || name === '.svg-container-cv'

  for (const option of options) {
    const text = option.split('.')

    d3.select('#' + div)
      .select('select')
      .append('option')
      .text(isSVorCV ? option : text[text.length - 1])
      .attr('value', option)
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

  if (divName === 'fields' || divName === 'methods')
    options = getElementName(d3.select(container), element, component)
  else if (divName === 'classes' || divName === 'interfaces')
    options = getClassName(d3.select(container), element, divName)

  insertOptions(container, divName, options)
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
