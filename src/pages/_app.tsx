import { Provider as NextAuthProvider } from 'next-auth/client'
import { useState } from 'react'

import { ThemeProvider } from '../themaContext'
import { Header } from '../components/Header'

import '../styles/global.scss'

function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider >
      <NextAuthProvider session={pageProps.sesseion}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
