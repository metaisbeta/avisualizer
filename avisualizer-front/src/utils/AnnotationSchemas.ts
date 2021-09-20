import * as d3 from 'd3'
import loDash from 'lodash'

type RootValueProps = {
  data: {
    name: string
    type: string
    value: number
    properties: {
      schema: string
    }
  }
}

export function annotationSchemas(root: any, name: string) {
  const schemasColorMap: Map<string, string> = new Map()
  const schemasObjectArray: { schema: string; color: string }[] = []
  const annotationsList: Map<string, string[]> = new Map()
  const annotationsCount: Map<string, number> = new Map()
  const schemasTotalAnnotations: Map<string, number> = new Map()

  const allSchemas = new Set()

  // Save all schemas
  if (name === 'class') {
    root.descendants().forEach((d: RootValueProps) => {
      if (d.data.type === 'annotation') allSchemas.add(d.data.properties.schema)
    })
  } else {
    root.descendants().forEach((d: RootValueProps) => {
      if (!loDash.isEmpty(d.data.properties))
        allSchemas.add(d.data.properties.schema)
    })
  }

  // Sort the array with the schemas
  const schemasOrdered = Array.from(allSchemas) as string[]
  schemasOrdered.sort()

  // Initialization of annotation list (schema: [annotations])
  for (const schema of schemasOrdered) {
    annotationsList.set(schema, [])
  }

  root.descendants().forEach((d: RootValueProps) => {
    const schema = d.data.properties?.schema

    if (d.data.type === 'annotation' && schema !== null) {
      // Array of the annotations in schema
      const arr = annotationsList.get(schema)

      if (!arr?.includes(d.data.name)) {
        arr?.push(d.data.name)
        annotationsCount.set(d.data.name, d.data.value)
      } else {
        const value = annotationsCount.get(d.data.name) ?? 0 + 1
        annotationsCount.set(d.data.name, value)
      }

      annotationsList.set(d.data.properties.schema, arr ?? [])
    }
  })

  // Counting total annotations of each schema
  for (const schemas of schemasOrdered) {
    schemasTotalAnnotations.set(schemas, 0)
  }

  for (const descendant of root.descendants()) {
    const data = descendant.data

    if (data.type === 'annotation') {
      const total = schemasTotalAnnotations.get(data.properties.schema) ?? 0

      schemasTotalAnnotations.set(data.properties.schema, total + 1)
    }
  }

  const groupsMap = new Map()
  const familyArray: string[] = []
  const hexColors = new Map()

  schemasOrdered.forEach((value) => {
    // Build schemas families
    const schema = value.split('.')
    let family: string

    if (schema[0] === 'javax') {
      if (schema[1] === 'persistence' || schema[1] === 'ejb')
        family = schema[0] + '.' + schema[1]
      else family = schema[0]
    } else {
      family = schema[0] + '.' + schema[1]
    }

    if (groupsMap.has(family)) {
      const elem = groupsMap.get(family)

      elem.push(value)
      groupsMap.set(family, elem)
    } else {
      familyArray.push(family)
      groupsMap.set(family, [value])
    }
  })

  const startFamilyColors = new Map()
  const endFamilyColors = new Map()
  const schemasArr = [
    'java.lang',
    'javax.persistence',
    'org.hibernate',
    'org.springframework',
    'org.junit',
    'org.mockito',
    'javax.ejb'
  ]
  const colorsStartArr = [
    '#146FF2',
    '#B55DB4',
    '#D7A3D1',
    '#ff7f00',
    '#40004b',
    '#6B00B8',
    '#32F214'
  ]
  const colorsEndArr = [
    '#146FF2',
    '#F9B9E8',
    '#D7A3D1',
    '#ffffb3',
    '#3E05A8',
    '#C77EFB',
    '#32F214'
  ]

  for (const index in schemasArr) {
    startFamilyColors.set(schemasArr[index], colorsStartArr[index])
    endFamilyColors.set(schemasArr[index], colorsEndArr[index])
  }

  for (const family of familyArray) {
    if (startFamilyColors.has(family)) {
      const colors = d3
        .scaleSequential(
          d3.interpolateRgbBasis([
            startFamilyColors.get(family),
            endFamilyColors.get(family)
          ])
        )
        .domain([0, groupsMap.get(family).length])

      for (let r = 0; r < groupsMap.get(family).length; r++) {
        hexColors.set(
          groupsMap.get(family)[r],
          d3.color(colors(r))?.formatHex()
        )
      }
    } else if (family === 'javax') {
      const cores = d3
        .scaleSequential(d3.interpolateRgbBasis(['red', '#FEBAB8']))
        .domain([0, groupsMap.get(family).length])
      for (let r = 0; r < groupsMap.get(family).length; r++) {
        hexColors.set(groupsMap.get(family)[r], d3.color(cores(r))?.formatHex())
      }
    } else {
      const colors = d3
        .scaleSequential(d3.interpolateRgbBasis(['#23201F', '#B6B5B4']))
        .domain([0, groupsMap.get(family).length])

      for (let r = 0; r < groupsMap.get(family).length; r++) {
        hexColors.set(
          groupsMap.get(family)[r],
          d3.color(colors(r))?.formatHex()
        )
      }
    }
  }

  schemasOrdered.forEach((value) => {
    schemasColorMap.set(value, hexColors.get(value))
    schemasObjectArray.push({ schema: value, color: hexColors.get(value) })
  })

  return {
    schemasOrdered,
    schemasColorMap,
    schemasObjectArray,
    annotationsList,
    annotationsCount
  }
}
