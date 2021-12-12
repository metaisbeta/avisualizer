import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;
  height: 65px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.white};

  padding: 16px 32px;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 52px;
    margin-right: 16px;
  }

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    cursor: default;
  }
`

export const Content = styled.div`
  button {
    font-weight: 700;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.primary};

    transition: all 0.2s;
  }

  button:hover {
    color: #004e91;
  }

  button + button {
    margin-left: 80px;
  }
`
