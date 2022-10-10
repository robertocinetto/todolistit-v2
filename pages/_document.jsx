import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-white dark:bg-slate-800 dark:text-slate-100 dark:dark-theme">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
