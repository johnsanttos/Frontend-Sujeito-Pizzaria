import { AppProps } from "../../node_modules/next/app"

import { AuthContext, AuthProvider } from "../contexts/AuthContext"

import '../../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
