import styled, { css } from 'styled-components'

export const Container = styled.div`
  table {
    border-collapse: collapse;
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
