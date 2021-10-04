import React, { useEffect } from 'react'

import { ClassVisualizer } from './ClassView'
import { PackageVisualizer } from './PackageView'
import { SystemVisualizer } from './SystemView'
import { ZoomableCircleProps } from './types'

export const ZoomableCircle: React.FC<ZoomableCircleProps> = ({
  systemData,
  packageData,
  classData,
  typeAnnotation: { typeAnnotation, setTypeAnnotation },
  annotationMetric: { annotationMetric, setAnnotationMetric },
  setPackageName
}) => {
  useEffect(() => {
    const width = 500
    const height = 500

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

    PackageVisualizer(
      packageData,
      width,
      height,
      setTypeAnnotation,
      'LOC in Annotation Declaration (LOCAD)',
      setAnnotationMetric,
      setPackageName
    )

    ClassVisualizer(
      classData,
      0,
      '',
      width,
      height,
      setTypeAnnotation,
      'Annotation Metric: Arguments in Annotation (AA)',
      setAnnotationMetric,
      setPackageName
    )
  }, [])

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
