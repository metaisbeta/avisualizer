import React, { useEffect, useState } from 'react'

import * as d3 from 'd3'
import { CaretDown } from 'phosphor-react'

import jsondata from '../../data/SpaceWeatherTSI-PV.json'
import { annotationSchemas } from '../../utils/AnnotationSchemas'
import { Checkbox } from '../Checkbox'
import { Color, Container } from './styles'
import { RowProps, SubSchemaProps } from './types'

export const Table = () => {
  const [rowData, setRowData] = useState<RowProps[]>()
  const [totalSchema, setTotalSchema] = useState<Record<string, number>>()
  const [subSchemas, setSubSchemas] = useState<Record<string, SubSchemaProps>>()
  const [annotationCount, setAnnotationCount] = useState<Map<string, number>>()
  const [allCheckbox, setAllCheckbox] = useState<boolean>(true)
  const [aux, setAux] = useState<boolean>(false)

  useEffect(() => {
    const getAllCountAnnotation = (
      allSchemas: { schema: string; color: string }[],
      annotList: Map<string, string[]>,
      annotCount: Map<string, number>
    ) => {
      const totalCount: Record<string, number> = {}

      for (const schema of allSchemas) {
        const annotations = annotList.get(schema.schema) ?? []
        let total = 0

        for (const annot of annotations) {
          total += annotCount.get(annot) ?? 0
        }

        totalCount[schema.schema] = total
      }

      setTotalSchema(totalCount)
    }

    const getSubSchema = (allSchemas: any, annotList: any) => {
      const allSubSchemas: Record<string, SubSchemaProps> = {}

      for (const schema of allSchemas) {
        const annotations = annotList.get(schema.schema)

        allSubSchemas[schema.schema] = {
          annotations: annotations,
          isOpen: false
        }
      }

      setSubSchemas(allSubSchemas)
    }

    const root: any = d3
      .hierarchy(jsondata)
      .sum((d: any) => d.value)
      .sort((a, b) => {
        if (b.value && a.value) return b.value - a.value
        else return 0
      })

    const { annotationsCount, annotationsList, schemasObjectArray } =
      annotationSchemas(root, 'system')

    getAllCountAnnotation(schemasObjectArray, annotationsList, annotationsCount)
    getSubSchema(schemasObjectArray, annotationsList)

    setRowData(schemasObjectArray)
    setAnnotationCount(annotationsCount)
  }, [])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>
              <Checkbox
                label=""
                checked={allCheckbox}
                onClick={() => setAllCheckbox(!allCheckbox)}
              />
            </th>
            <th style={{ width: '350px', textAlign: 'start' }}>Annotation</th>
            <th>Total</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rowData?.map((value, index: number) => (
            <React.Fragment key={index}>
              <tr className="schema" id={`schema-${value.schema}`}>
                <td>
                  <Checkbox label="" checked={allCheckbox} />
                </td>
                <td style={{ textAlign: 'start' }}>{value.schema}</td>
                <td>{totalSchema?.[value.schema]}</td>
                <td>
                  <Color color={value.color} />
                </td>
                <td>
                  <button
                    onClick={() => {
                      setAux(!aux)

                      const allSub = subSchemas

                      if (allSub?.[value.schema])
                        allSub[value.schema].isOpen =
                          !allSub[value.schema].isOpen

                      setSubSchemas(allSub)
                    }}
                  >
                    <CaretDown color="#393939" />
                  </button>
                </td>
              </tr>

              {subSchemas?.[value.schema].isOpen &&
                subSchemas?.[value.schema].annotations?.map((annot: string) => (
                  <tr key={annot} style={{ border: 'none' }}>
                    <td></td>
                    <td style={{ textAlign: 'start', display: 'flex' }}>
                      <Checkbox label="" checked={allCheckbox} />
                      {annot}
                    </td>
                    <td>{annotationCount?.get(annot)}</td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
