import * as d3 from 'd3'

export function annotMetricUpdate(
  setAnnotationMetric: (annot: string) => void,
  viewName: string
) {
  let annotMetric = ''

  if (viewName === 'System View')
    annotMetric = annotMetric.concat('Number of Annotations')
  else if (viewName === 'Package View')
    annotMetric = annotMetric.concat('LOC in Annotation Declaration (LOCAD)')
  else annotMetric = annotMetric.concat('Arguments in Annotations (AA)')

  setAnnotationMetric(annotMetric)
}

export function metricInfoUpdate(metric: string) {
  let metricName = ''

  if (metric === 'aa')
    metricName = 'Annotation Metric: Arguments in Annotation (AA)'
  else if (metric === 'locad')
    metricName = 'Annotation Metric: LOC in Annotation Declaration (LOCAD)'
  else metricName = 'Annotation Metric: Annotation Nesting Level (ANL)'

  d3.select('#annotMetric').text(metricName)
}
