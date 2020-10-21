import parseMarkdownFiles from "../../lib/parse-markdown-files"
import { useQuery, gql } from "@apollo/client"

import PageTemplate from "../../templates/page"
import LoadingTemplate from "../../templates/loading"

import Loader from "../../components/loader"

const BOOKS_QUERY = gql`
  query {
    sandwiches: trello {
      title
      image
      body
      excerpt
    }
  }
`

const TrelloSandwiches = ({}) => {
  const pageTitle = "Trello Sandwiches"
  const { loading, error, data } = useQuery(BOOKS_QUERY)

  const items = data ? data.sandwiches : []

  if (loading) return <LoadingTemplate title={pageTitle} logo="trello" />
  // if (error) return <p>Error :(</p>

  return <PageTemplate title={pageTitle} items={items || []} logo="trello" />
}

export async function getStaticProps() {
  const items = parseMarkdownFiles("trello")

  return {
    props: {
      items: items
    }
  }
}

export default TrelloSandwiches
