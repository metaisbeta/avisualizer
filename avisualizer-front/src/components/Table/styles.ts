import styled, { css } from 'styled-components'

export const Container = styled.div`
  table {
    border-collapse: collapse;
    cursor: default;
    max-height: 500px;
    overflow-y: auto;
    display: block;
  }

  th {
    padding: 8px;

    font-weight: 600;
    font-size: 18px;

    border-bottom: ${({ theme }) => `2px solid ${theme.colors.gray4}`};
  }

  td {
    padding: 8px;

    font-weight: 400;
    font-size: 16px;
  }

  tbody > tr {
    border-top: ${({ theme }) => `1px solid ${theme.colors.gray2}`};
  }

  .pagination {
    display: flex;
    margin: 25px;
    justify-content: flex-end;
  }

  .pagination p {
    margin-left: 10px;
    margin-right: 10px;
  }
`

type ColorStyledProps = {
  color: string
}

export const Color = styled.div<ColorStyledProps>`
  width: 20px;
  height: 20px;

  border-radius: 100%;

  ${({ color }) => css`
    background: ${color};
  `}
`
