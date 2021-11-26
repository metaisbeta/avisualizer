import styled from 'styled-components'

export const Container = styled.div`
  height: 500px;
`

export const Tab = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`

type ButtonStyled = {
  selected: boolean
}

export const Button = styled.div<ButtonStyled>`
  cursor: pointer;

  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? 700 : 500)};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primaryDark : theme.colors.gray3};

  padding: 10px 30px;

  transition: all 0.2s;

  border-bottom: ${({ selected, theme }) =>
    selected && `2px solid ${theme.colors.primaryDark}`};

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.gray2};
  }

  &:hover {
    color: ${({ selected, theme }) =>
      selected ? '#004e91' : theme.colors.gray4};
  }
`

export const Content = styled.div`
  margin-top: 16px;

  p {
    font-size: 16px;
    text-align: justify;
    line-height: 24px;
  }

  p + p {
    margin-top: 8px;
  }
`

export const ImgContent = styled.div`
  display: flex;

  margin: 24px 0;
  justify-content: space-around;
`
