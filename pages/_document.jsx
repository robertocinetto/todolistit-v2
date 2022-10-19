import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          rel='manifest'
          href='/manifest.json'
        />
        <link
          rel='apple-touch-icon'
          href='/todolistit-logo-192.png'
        />
        <meta
          name='theme-color'
          content='#6d28d9'
        />
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600&display=swap'
          rel='stylesheet'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
      </Head>
      <body className='bg-white dark:bg-slate-800 dark:text-slate-100 dark:dark-theme'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
