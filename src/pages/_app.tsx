import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Providers from '../Providers'
import '@zkmelabs/widget/dist/style.css'

import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import router from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Ensure gtag is defined before calling it
      if (typeof window.gtag === 'function') {
        window.gtag('config', GA_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <Providers>
      <AnyComponent {...pageProps} />
    </Providers>
  )
}
