import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      primaryDark: string
      primaryLight: string
      background: string

      white: string
      gray1: string
      gray2: string
      gray3: string
      gray4: string
      black: string
    }
  }
}
