import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;

  table {
    border-collapse: collapse;
    cursor: default;
    max-height: 431px;
    overflow-y: auto;
    display: block;
    width: 100%;
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

  .search {
    margin-bottom: 24px;
    text-align: end;

    input {
      height: 40px;
      width: 300px;

      border: ${({ theme }) => `1px solid ${theme.colors.gray4} !important`};
      border-radius: 8px;

      padding: 8px;
    }
  }
`

type PaginationProps = {
  previousDisabled: boolean
  nextDisabled: boolean
}

export const Pagination = styled.div<PaginationProps>`
  display: flex;
  margin: 25px;
  justify-content: flex-end;

  p {
    margin-left: 10px;
    margin-right: 10px;
  }

  button {
    font-weight: 500;
  }

  button:first-of-type {
    cursor: ${({ previousDisabled }) =>
      previousDisabled ? 'not-allowed' : 'pointer'};
    color: ${({ previousDisabled, theme }) =>
      previousDisabled ? theme.colors.gray4 : theme.colors.black};
  }

  button:last-of-type {
    cursor: ${({ nextDisabled }) => (nextDisabled ? 'not-allowed' : 'pointer')};
    color: ${({ nextDisabled, theme }) =>
      nextDisabled ? theme.colors.gray4 : theme.colors.black};
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
