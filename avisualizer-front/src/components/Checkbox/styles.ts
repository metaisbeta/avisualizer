import styled from 'styled-components'

export const Container = styled.label`
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  padding-left: 28px;
  position: relative;
  cursor: pointer;
  user-select: none;

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
    font-weight: 400;
  }

  input {
    display: none;
  }

  span {
    width: 20px;
    height: 20px;

    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;

    border: ${({ theme }) => `2px solid ${theme.colors.gray4}`};
    border-radius: 4px;
  }

  input:checked + span {
    border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
    border-radius: 4px;
  }

  input:checked + span:after {
    height: 6px;
    width: 11px;

    content: '';

    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);

    border-left: ${({ theme }) => `2px solid ${theme.colors.primary}`};
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  }
`
