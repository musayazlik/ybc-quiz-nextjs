import "@/styles/globals.css"

import { ThemeProvider } from "next-themes"
import { Wrapper } from "./context"

export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  )
}
