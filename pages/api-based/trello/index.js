import { useQuery, gql } from "@apollo/client"

import PageTemplate from "../../../templates/page"
import LoadingTemplate from "../../../templates/loading"

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

  if (error) console.error(error)

  if (loading || error) return <LoadingTemplate title={pageTitle} logo="trello" />

  return <PageTemplate title={pageTitle} items={items || []} logo="trello" />
}

export default TrelloSandwiches
