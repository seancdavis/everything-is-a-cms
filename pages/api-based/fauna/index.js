import { useQuery, gql } from "@apollo/client"

import PageTemplate from "../../../templates/page"
import LoadingTemplate from "../../../templates/loading"

const SANDWICHES_QUERY = gql`
  query {
    sandwiches: fauna {
      title
      image
      body
      excerpt
    }
  }
`

const FaunaSandwiches = ({}) => {
  const pageTitle = "Fauna Sandwiches"
  const { loading, error, data } = useQuery(SANDWICHES_QUERY)

  const items = data ? data.sandwiches : []

  if (error) console.error(error)

  if (loading || error) return <LoadingTemplate title={pageTitle} logo="fauna" />

  return <PageTemplate title={pageTitle} items={items || []} logo="fauna" />
}

export default FaunaSandwiches
