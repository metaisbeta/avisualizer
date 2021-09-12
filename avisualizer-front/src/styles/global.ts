import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      padding: 1px;
    }
    ::-webkit-scrollbar-track {
      margin-top: 3px;
      margin-bottom: 3px;
      background: #f1f1f1;
      transition: 0.2s;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #d6d6d6;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #b8b8b8;
    }
  }
  html, body, #root {
    width: 100vw;
    height: 100%;
  }
  body, button, input, textarea {
    font: 400 16px 'Manrope', sans-serif;
  }
  ul {
    list-style: none;
  }
  body {
    -webkit-font-smoothing: antialiased;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    input[type=number] {
      -moz-appearance: textfiel;
    }
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      padding: 1px;
    }
    ::-webkit-scrollbar-track {
      margin-top: 3px;
      margin-bottom: 3px;
      background: #f1f1f1;
      transition: 0.2s;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #d6d6d6;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #b8b8b8;
    }
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
    border: none;
    background: none;
  }
  h1 {
    font-weigth: 700;
    font-size: 28px;
    color: #393939;
  }
`
