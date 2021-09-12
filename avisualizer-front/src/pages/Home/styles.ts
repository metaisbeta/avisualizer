import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;
  text-align: center;
  padding: 0px 24px;
`

export const Content = styled.div`
  width: 100%;

  display: flex;

  > div + div {
    margin-left: 24px;
  }
`

export const ZoomableCircleContainer = styled.div`
  width: 50%;
  text-align: left;
  margin-top: 24px;

  h3 {
    font-weight: 400;
    font-size: 18px;
  }

  h3 + h3 {
    margin-top: 8px;
  }

  h3:last-of-type {
    margin-bottom: 16px;
  }
`

export const TypeAnnotationContainer = styled.div`
  width: 600px;

  display: flex;
  justify-content: space-between;

  margin-top: 16px;

  div + div {
    margin-left: 24px;
  }
`
