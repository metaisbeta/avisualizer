import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;

  background: ${({ theme }) => theme.colors.gray5};
`

export const Content = styled.div`
  border-radius: 5px;

  background: ${({ theme }) => theme.colors.white};
`
