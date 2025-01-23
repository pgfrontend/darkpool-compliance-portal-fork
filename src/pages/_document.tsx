import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Leveraging the latest zk technology on-chain. Invest in DeFi confidently, transact on-chain confidentially."
        />
        <meta
          name="description"
          content="Leveraging the latest zk technology on-chain. Invest in DeFi confidently, transact on-chain confidentially."
        />
        {/*<!-- Twitter Meta Tags -->*/}
        <meta name="twitter:title" content="Singularity" />
        <meta
          name="twitter:description"
          content="Leveraging the latest zk technology on-chain. Invest in DeFi confidently, transact on-chain confidentially."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
