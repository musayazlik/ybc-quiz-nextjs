import "@/styles/globals.css"
import { Wrapper } from "./context"

export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  )
}
