import React, { useEffect, useState } from 'react'

import * as d3 from 'd3'
import { min, values } from 'lodash'
import { CaretDown } from 'phosphor-react'

import jsondata from '../../data/SpaceWeatherTSI-PV.json'
import { annotationSchemas } from '../../utils/AnnotationSchemas'
import { Checkbox } from '../Checkbox'
import { Color, Container } from './styles'
import { RowProps, SubSchemaProps } from './types'

export const Table = () => {
  const [rowData, setRowData] = useState<RowProps[]>()
  const [initialRowData, setInitialRowData] = useState<RowProps[]>()
  const [totalSchema, setTotalSchema] = useState<Record<string, number>>()
  const [subSchemas, setSubSchemas] = useState<Record<string, SubSchemaProps>>()
  const [annotationCount, setAnnotationCount] = useState<Map<string, number>>()
  const [allCheckbox, setAllCheckbox] = useState<boolean>(true)
  const [aux, setAux] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rowsPerPage] = useState<number>(3)

  const totalPages = rowData && Math.ceil(rowData?.length / rowsPerPage)

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

    const getSubSchema = (
      allSchemas: { schema: string; color: string }[],
      annotList: Map<string, string[]>
    ) => {
      const allSubSchemas: Record<string, SubSchemaProps> = {}

      for (const schema of allSchemas) {
        const annotations = annotList.get(schema.schema) ?? []

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
    setInitialRowData(schemasObjectArray)
    setAnnotationCount(annotationsCount)
  }, [])

  const searchAnnotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    const itemsToShow = initialRowData?.filter((value) => {
      if (value.schema.includes(e.target.value)) return value
      return null
    })
    setRowData(itemsToShow)
  }
  const pagination = () => {
    const rowMin = (currentPage - 1) * rowsPerPage
    const rowMax = currentPage * rowsPerPage
    return rowData?.filter(
      (value, index) => index >= rowMin && index < rowMax && value
    )
  }
  const pageInfo = () => {
    const total = rowData?.length
    const start = currentPage == 1 ? 1 : (currentPage - 1) * rowsPerPage
    const end = currentPage == totalPages ? total : currentPage * rowsPerPage
    return `${start} - ${end} of ${total}`
  }

  const nextPage = () => {
    if (totalPages && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const previousPage = () => {
    if (rowData && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  return (
    <Container>
      <div className="search">
        <input
          type="text"
          placeholder="Search Annotation by Package Name"
          onChange={searchAnnotation}
        />
      </div>
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
          {pagination()?.map((value, index: number) => (
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
      <div className="pagination">
        <button onClick={() => previousPage()}>Previous</button>
        <p>{pageInfo()}</p>
        <button onClick={() => nextPage()}>Next</button>
      </div>
    </Container>
  )
}
