import Head from "next/head"

import "../styles/tailwind.css"

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Everything is a CMS!</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
