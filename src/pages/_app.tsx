import { AppProps } from "../../node_modules/next/app"

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { AuthContext, AuthProvider } from "../contexts/AuthContext"



import '../../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
    <Component {...pageProps} />
    <ToastContainer autoClose={3000}/>
    </AuthProvider>
  )
}

export default MyApp
