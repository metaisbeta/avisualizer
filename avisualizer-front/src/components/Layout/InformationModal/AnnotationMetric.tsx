import React from 'react'

import { Link } from 'react-router-dom'

import { Content } from './styles'

export const AnnotationMetric = () => {
  return (
    <Content>
      <p style={{ marginBottom: '24px' }}>
        In the software, a new set of software metrics dedicated to code
        annotations was proposed:
      </p>

      <p>
        <b>Annotations In Class (AC):</b> it counts the number of annotations
        declared on all code elements in a class, including nested annotations.
      </p>

      <p>
        <b>Unique Annotations in Class (UAC):</b> it counts only distinct
        annotations (Two annotations are equal if they have the same name, and
        all arguments match).
      </p>

      <p>
        <b>Annotations Schemas in Class (ASC):</b> an annotation schema
        represents a set of related annotations provided by a framework or tool.
        This measures how coupled a class is to a framework.
      </p>

      <p>
        <b>Arguments in Annotations (AA):</b> it counts the number of arguments
        contained in the annotation.
      </p>

      <p>
        <b>Annotations in Element Declaration (AED):</b> it counts how many
        annotations are declared in each code element, including nested
        annotations.
      </p>

      <p>
        <b>Annotation Nesting Level (ANL):</b> annotations can have other
        annotations as arguments, which translates into nested annotations. ANL
        measures how deep an annotation is nested (the root level is considered
        value zero).
      </p>

      <p>
        <b>LOC in Annotation Declaration (LOCAD):</b> it counts the number of
        lines used in an annotation declaration.
      </p>

      <p
        style={{
          paddingBottom: '24px',
          marginTop: '16px',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        Read more:{' '}
        <Link
          to={{ pathname: 'https://joss.theoj.org/papers/10.21105/joss.01960' }}
          target="_blank"
        >
          Annotation Sniffer: A tool to Extract Code Annotations Metrics
        </Link>
      </p>
    </Content>
  )
}
