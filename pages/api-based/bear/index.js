import { useQuery, gql } from "@apollo/client"

import PageTemplate from "../../../templates/page"
import LoadingTemplate from "../../../templates/loading"

const SANDWICHES_QUERY = gql`
  query {
    sandwiches: bear {
      title
      image
      body
      excerpt
    }
  }
`

const BearSandwiches = ({}) => {
  const pageTitle = "Bear Sandwiches"
  const { loading, error, data } = useQuery(SANDWICHES_QUERY)

  const items = data ? data.sandwiches : []

  if (error) console.error(error)

  if (loading || error) return <LoadingTemplate title={pageTitle} logo="bear" />

  return <PageTemplate title={pageTitle} items={items || []} logo="bear" />
}

export default BearSandwiches
