import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
   0% {
      opacity: 1;
   }
   100% {
      opacity: 0;
   }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    > circle:nth-child(0) {
      animation: ${loadingAnimation} 3s ease infinite;
    }
    > circle:nth-child(1) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 0.2s;
    }
    > circle:nth-child(2) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 0.4s;
    }
    > circle:nth-child(3) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 0.6s;
    }
    > circle:nth-child(4) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 0.8s;
    }
    > circle:nth-child(5) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 1s;
    }
    > circle:nth-child(6) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 1.2s;
    }
    > circle:nth-child(7) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 1.4s;
    }
    > circle:nth-child(8) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 1.6s;
    }
    > circle:nth-child(9) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 1.8s;
    }
    > circle:nth-child(10) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 2s;
    }
    > circle:nth-child(11) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 2.2s;
    }
    > circle:nth-child(12) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 2.4s;
    }
    > circle:nth-child(13) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 2.6s;
    }
    > circle:nth-child(14) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 2.8s;
    }
    > circle:nth-child(15) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 3s;
    }
    > circle:nth-child(16) {
      animation: ${loadingAnimation} 3s ease infinite;
      animation-delay: 3.2s;
    }
  }
`
