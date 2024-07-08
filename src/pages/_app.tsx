import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Providers from '../Providers'
import '@zkmelabs/widget/dist/style.css'
import '@quadrata/core-react/lib/cjs/quadrata-ui.min.css';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any

  return (
    <Providers>
      <AnyComponent {...pageProps} />
    </Providers>
  )
}
