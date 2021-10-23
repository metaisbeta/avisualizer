import styled from 'styled-components'

export const Container = styled.label`
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
    border-radius: 100%;
  }

  input:checked + span {
    border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
    border-radius: 100%;
  }

  input:checked + span:after {
    height: 8px;
    width: 8px;

    content: '';

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: ${({ theme }) => `${theme.colors.primary}`};
    border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
    border-radius: 100%;
  }
`
