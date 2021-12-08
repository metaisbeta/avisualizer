import styled from 'styled-components'

export const Container = styled.div`
  justify-content: center;
`
export const Content = styled.div`
  width: 600px;
  height: auto;
  min-height: 150px;

  padding: 10px 15px 20px 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SelectRepoContainer = styled.div`
  width: 100%;

  h3 {
    font-size: 17px;

    margin-bottom: 7px;

    color: ${({ theme }) => `${theme.colors.black}`};
  }

  .public-repo .search {
    display: flex;
    align-items: center;
  }

  .public-repo .search input {
    height: 35px;
    width: 100%;

    padding-left: 7px;
    font-size: 14px;

    border: 1px solid ${({ theme }) => `${theme.colors.gray4}`};
    border-radius: 5px;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }

  .public-repo .search button {
    width: 35px;
    height: 35px;

    font-size: 15px;

    border-radius: 5px;
    color: ${({ theme }) => `${theme.colors.gray4}`};
    border: 1px solid ${({ theme }) => `${theme.colors.gray4}`};

    margin-left: 10px;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }
`

export const ReposContainer = styled.div`
  width: 100%;

  table {
    width: 100%;
  }

  table thead {
    font-size: 15px;
  }

  table tbody {
    font-size: 14px;
  }

  table thead tr th {
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.gray4}`};
  }

  table thead tr th,
  table tbody tr td {
    padding: 5px;
  }

  table thead th:first-child,
  table tbody td:first-child {
    text-align: left;
  }

  table thead th:last-child,
  table tbody td:last-child {
    text-align: left;
  }
`

export const ActionContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-evenly;

  button {
    width: 125px;
    height: 30px;

    font-size: 14px;
    font-weight: bold;

    border-radius: 7px;
  }

  #btn-open {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  #btn-cancel {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.black};
  }
`

export const SelectProjectContainer = styled.div`
  width: 100%;

  h3 {
    font-size: 17px;

    margin-bottom: 7px;

    color: ${({ theme }) => `${theme.colors.black}`};
  }

  .select {
    display: flex;
    align-items: center;
  }

  .select input {
    height: 35px;

    padding-left: 7px;
    font-size: 14px;

    border: 1px solid ${({ theme }) => `${theme.colors.gray4}`};
    border-radius: 5px;
  }

  .select button {
    width: 35px;
    height: 35px;

    font-size: 15px;

    border-radius: 5px;
    color: ${({ theme }) => `${theme.colors.gray4}`};
    border: 1px solid ${({ theme }) => `${theme.colors.gray4}`};

    margin-left: 10px;
  }
`
