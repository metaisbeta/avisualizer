import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const TabHeader = styled.ul`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  li {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray5};
    border-right: 2px solid ${({ theme }) => theme.colors.gray5};
  }

  li:last-child {
    border-right: none;
  }

  li h1 {
    font-size: 17px;
    font-weight: bold;

    padding: 10px;
  }

  .active-tab {
    border-bottom-color: ${({ theme }) => theme.colors.primary} !important;
  }
`

export const TabContent = styled.div`
  width: 100%;
  height: 100%;
`
