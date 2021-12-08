import styled from 'styled-components'

export const Container = styled.div`
  h3 {
    font-size: 17px;

    margin-bottom: 7px;

    color: ${({ theme }) => `${theme.colors.black}`};
  }

  > div {
    width: 300px;
  }
`

export const InputContrainer = styled.div`
  width: 100%;

  button {
    height: 35px;

    padding-left: 20px;
    padding-right: 20px;

    font-size: 15px;
    font-weight: bold;

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    color: ${({ theme }) => `${theme.colors.black}`};
    border: 1px solid ${({ theme }) => `${theme.colors.gray4}`};
    background-color: ${({ theme }) => `${theme.colors.gray1}`};
  }

  input {
    width: 200px;
    height: 35px;

    padding-left: 10px;
    font-size: 14px;

    border: 1px solid ${({ theme }) => `${theme.colors.gray4}`};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`
