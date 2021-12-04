import styled from 'styled-components'

export const Container = styled.div`
  height: 320px;

  margin: 8px 24px;

  table {
    width: 100%;

    border-collapse: collapse;
    margin-top: 40px;

    tr {
      height: 60px;
    }

    tbody > tr:not(:last-of-type) {
      border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray2}`};
    }

    td {
      font-weight: 600;
    }
  }
`
