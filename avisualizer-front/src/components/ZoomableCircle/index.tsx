/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'

import { PackageVisualizer } from './PackageView'
import { SystemVisualizer } from './SystemView'
import { ZoomableCircleProps } from './types'

export const ZoomableCircle: React.FC<ZoomableCircleProps> = ({
  systemData,
  packageData,
  typeAnnotation: { typeAnnotation, setTypeAnnotation },
  annotationMetric: { annotationMetric, setAnnotationMetric },
  setPackageName
}) => {
  useEffect(() => {
    const width = 500
    const height = 500

    if (typeAnnotation === 'System View')
      SystemVisualizer(
        systemData,
        width,
        height,
        packageData,
        setTypeAnnotation,
        annotationMetric,
        setAnnotationMetric,
        setPackageName
      )
  }, [typeAnnotation])

  return (
    <div className="tooltip-container">
      <div
        className="svg-container-sv"
        style={{ display: typeAnnotation === 'System View' ? 'block' : 'none' }}
      />
      <div
        className="svg-container-pv"
        style={{
          display: typeAnnotation === 'Package View' ? 'block' : 'none'
        }}
      />
      <div
        className="svg-container-cv"
        style={{ display: typeAnnotation === 'Class View' ? 'block' : 'none' }}
      />
    </div>
  )
}
