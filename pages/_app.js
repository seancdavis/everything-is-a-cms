import Head from "next/head"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

import "../styles/tailwind.css"
import "../styles/loader.css"

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Everything is a CMS!</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
