import React, { useEffect, useState } from 'react'

import * as d3 from 'd3'
import { CaretDown } from 'phosphor-react'

import jsondata from '../../data/SpaceWeatherTSI-PV.json'
import { annotationSchemas } from '../../utils/AnnotationSchemas'
import {
  displayAllCircles,
  hideAllCircles,
  hideAnnotations
} from '../../utils/SVG'
import { Checkbox } from '../Checkbox'
import { Color, Container, Pagination } from './styles'
import { AnnotationsCheckboxProps, RowProps, SubSchemaProps } from './types'

export const Table = ({ typeAnnotation }: { typeAnnotation: string }) => {
  const [rowData, setRowData] = useState<RowProps[]>([])
  const [allTableData, setAllTableData] = useState<RowProps[]>([])
  const [totalSchema, setTotalSchema] = useState<Record<string, number>>()
  const [subSchemas, setSubSchemas] = useState<Record<string, SubSchemaProps>>()
  const [annotationCount, setAnnotationCount] = useState<Map<string, number>>()

  const [isAllChecked, setIsAllChecked] = useState<boolean>(true)
  const [annotationsCheckbox, setAnnotationsCheckbox] =
    useState<Record<string, AnnotationsCheckboxProps>>()
  const [numberOfChecked, setNumberOfChecked] = useState(0)
  const [numberOfAnnotation, setNumberOfAnnotation] = useState(0)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rowsPerPage] = useState<number>(10)

  const totalPages = rowData && Math.ceil(rowData?.length / rowsPerPage)

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const projectID = params.get('projeto')
    let jsonData: any

    const request = async () => {
      if (projectID != null) {
        const response = await fetch(
          'https://asniffer-web-api.herokuapp.com/data.json?project=' +
            projectID
        )
        jsonData = await response.json()
      }
    }
    request().then(() => {
      //render(sv,pv,cv)//});

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

        for (const value of allSchemas) {
          const annotations = annotList.get(value.schema) ?? []

          allSubSchemas[value.schema] = {
            annotations: annotations,
            isOpen: false
          }
        }

        setSubSchemas(allSubSchemas)
      }

      let jsonDataInput: any

      if (projectID != null) {
        jsonDataInput = JSON.parse(jsonData.pv)
        //jsonDataInput = jsondata
      } else {
        jsonDataInput = jsondata
      }

      console.log(jsonDataInput)

      const root: any = d3
        .hierarchy(jsonDataInput)
        .sum((d: any) => d.value)
        .sort((a, b) => {
          if (b.value && a.value) return b.value - a.value
          else return 0
        })

      const { annotationsCount, annotationsList, schemasObjectArray } =
        annotationSchemas(root, 'system')

      getAllCountAnnotation(
        schemasObjectArray,
        annotationsList,
        annotationsCount
      )
      getSubSchema(schemasObjectArray, annotationsList)

      setRowData(schemasObjectArray)
      setAllTableData(schemasObjectArray)
      setAnnotationCount(annotationsCount)
    })
  }, [])

  useEffect(() => {
    const initializeAnnotationsCheckbox = () => {
      const checked: Record<string, AnnotationsCheckboxProps> = {}

      for (const row of allTableData) {
        checked[row.schema] = {
          checked: true,
          annotations: []
        }

        if (subSchemas?.[row.schema]) {
          for (const _ of subSchemas[row.schema].annotations)
            checked[row.schema].annotations.push(true)
        }
      }

      setNumberOfAnnotation(allTableData.length)
      setNumberOfChecked(allTableData.length)
      setAnnotationsCheckbox(checked)
    }

    initializeAnnotationsCheckbox()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTableData, typeAnnotation])

  const searchAnnotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)

    const itemsToShow =
      allTableData?.filter((value) => {
        if (value.schema.toLowerCase().includes(e.target.value.toLowerCase()))
          return value
        return null
      }) ?? []

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

  const getContainer = () => {
    switch (typeAnnotation) {
      case 'System View':
        return '.svg-container-sv'
      case 'Package View':
        return '.svg-container-pv'
      case 'Class View':
        return '.svg-container-cv'
    }

    return ''
  }

  const handleShowAllAnnotations = (show: boolean) => {
    const container = getContainer()

    if (show) displayAllCircles(container)
    else hideAllCircles(container)
  }

  const handleHideOrShowAnnotation = (schema: string) => {
    const container = getContainer()

    const checkbox = annotationsCheckbox?.[schema]

    if (checkbox) {
      if (checkbox.checked) setNumberOfChecked((prev) => prev - 1)
      else setNumberOfChecked((prev) => prev + 1)

      const isChecked = checkbox.checked

      hideAnnotations(container, schema, isChecked)

      const annotations = checkbox.annotations

      let annot = []

      // Tf checkbox is disabled, the children's checkbox will also be
      if (isChecked) annot = new Array(annotations.length).fill(false)
      else annot = annotations

      setAnnotationsCheckbox({
        ...annotationsCheckbox,
        [schema]: {
          checked: !isChecked,
          annotations: annot
        }
      })
    }
  }

  const handleHideOrShowSubAnnotation = (
    parentSchema: string,
    schema: string,
    index: number
  ) => {
    const container = getContainer()

    const checkbox = annotationsCheckbox?.[parentSchema]

    if (checkbox) {
      const isChecked = checkbox.annotations[index]

      hideAnnotations(container, schema, isChecked)

      const subAnnot = [...(checkbox.annotations ?? [])]

      subAnnot[index] = !subAnnot[index]

      const allSubAnnotIsChecked =
        subAnnot.filter((value) => value).length === subAnnot.length

      if (allSubAnnotIsChecked) setNumberOfChecked((prev) => prev + 1)
      else {
        if (checkbox.checked) setNumberOfChecked((prev) => prev - 1)
      }

      setAnnotationsCheckbox({
        ...annotationsCheckbox,
        [parentSchema]: {
          checked: allSubAnnotIsChecked,
          annotations: subAnnot
        }
      })
    }
  }

  useEffect(() => {
    const setAnnotationsCheckboxValues = (option: boolean) => {
      const checkbox: Record<string, AnnotationsCheckboxProps> = {}

      for (const annotation of Object.keys(annotationsCheckbox ?? {})) {
        const annotationsValue =
          annotationsCheckbox?.[annotation].annotations ?? []

        checkbox[annotation] = {
          checked: option,
          annotations: new Array(annotationsValue.length).fill(option)
        }
      }

      return checkbox
    }

    if (isAllChecked) {
      setNumberOfChecked(numberOfAnnotation)
      setAnnotationsCheckbox(setAnnotationsCheckboxValues(true))
    }

    if (!isAllChecked && numberOfChecked === numberOfAnnotation) {
      setNumberOfChecked(0)
      setAnnotationsCheckbox(setAnnotationsCheckboxValues(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllChecked])

  useEffect(() => {
    const checkIfAllCheckboxIsChecked = () => {
      if (numberOfAnnotation === numberOfChecked) setIsAllChecked(true)
      else setIsAllChecked(false)
    }

    checkIfAllCheckboxIsChecked()
  }, [numberOfAnnotation, numberOfChecked])

  return (
    <Container>
      <div className="search">
        <input
          type="text"
          placeholder="Search annotation by package name"
          onChange={searchAnnotation}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={isAllChecked}
                onClick={() => {
                  handleShowAllAnnotations(!isAllChecked)
                  setIsAllChecked(!isAllChecked)
                }}
              />
            </th>
            <th style={{ width: '100%', textAlign: 'start' }}>Annotation</th>
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
                  <Checkbox
                    checked={
                      isAllChecked ||
                      annotationsCheckbox?.[value.schema].checked
                    }
                    onClick={() => handleHideOrShowAnnotation(value.schema)}
                  />
                </td>
                <td style={{ textAlign: 'start' }}>{value.schema}</td>
                <td>{totalSchema?.[value.schema]}</td>
                <td>
                  <Color color={value.color} />
                </td>
                <td>
                  <button
                    onClick={() => {
                      const allSub = Object.assign({}, subSchemas)

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
                subSchemas?.[value.schema].annotations?.map(
                  (annot: string, i: number) => (
                    <tr key={annot} style={{ border: 'none' }}>
                      <td></td>
                      <td style={{ textAlign: 'start', display: 'flex' }}>
                        <Checkbox
                          checked={
                            annotationsCheckbox?.[value.schema].checked ||
                            annotationsCheckbox?.[value.schema].annotations[i]
                          }
                          onClick={() =>
                            handleHideOrShowSubAnnotation(
                              value.schema,
                              annot,
                              i
                            )
                          }
                        />
                        {annot}
                      </td>
                      <td>{annotationCount?.get(annot)}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  )
                )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Pagination
        previousDisabled={currentPage === 1}
        nextDisabled={currentPage === totalPages}
      >
        <button onClick={() => previousPage()}>Previous</button>
        <p>{pageInfo()}</p>
        <button onClick={() => nextPage()}>Next</button>
      </Pagination>
    </Container>
  )
}
