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
    font-weight: 700;
    font-size: 28px;
    color: #393939;
  }
  .react-modal-overlay {
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .react-modal-content {
    width: 100%;
    max-width: 700px;
    background: #ffffff;
    padding: 1rem 2rem;
    position: relative;
    border-radius: 0.25rem;
    overflow-y: scroll;
  }
  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.7rem;
    border: 0;
    background: transparent;
    transition: filter 0.2s;
    &:hover {
        filter: brightness(0.8);
    }
  }
`
