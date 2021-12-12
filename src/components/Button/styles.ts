import styled, { css } from 'styled-components'

type ButtonStyledProps = {
  colorInvert: boolean
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  height: 40px;

  padding: 12px 42px;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 600;

  ${({ theme, colorInvert }) => css`
    background: ${colorInvert ? theme.colors.white : theme.colors.primary};
    color: ${colorInvert ? theme.colors.primary : theme.colors.white};
    border: ${colorInvert ? `1px solid ${theme.colors.primary}` : '0px'};
  `}

  transition: all 0.2s;

  &:hover {
    ${({ theme, colorInvert }) => css`
      background: ${colorInvert
        ? theme.colors.white
        : theme.colors.primaryDark};
      color: ${colorInvert ? theme.colors.primaryDark : theme.colors.white};
      border: ${colorInvert ? `1px solid ${theme.colors.primaryDark}` : '0px'};
    `}
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
