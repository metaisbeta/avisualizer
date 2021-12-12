export type ZoomableCircleProps = {
  systemData: any
  packageData: any
  classData: any
  typeAnnotation: {
    typeAnnotation: string
    setTypeAnnotation: (title: string) => void
  }
  annotationMetric: {
    annotationMetric: string
    setAnnotationMetric: (title: string) => void
  }
  setPackageName: (title: string) => void
}
