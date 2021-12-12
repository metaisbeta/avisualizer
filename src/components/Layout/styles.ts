import styled from 'styled-components'

export const Container = styled.header`
  height: 100vh;

  display: flex;
  flex-direction: column;
`

export const Content = styled.main`
  width: 100%;
  height: 100%;

  overflow-y: auto !important;
  background: ${({ theme }) => theme.colors.background};

  padding: 24px;
`
