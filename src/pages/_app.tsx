import { Header } from '../components/Header'
import { Provider as NextAuthProvider } from 'next-auth/client'

import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.sesseion}>
      <Header />
      <Component  {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
