import { useQuery, gql } from "@apollo/client"

import PageTemplate from "../../../templates/page"
import LoadingTemplate from "../../../templates/loading"

const SANDWICHES_QUERY = gql`
  query {
    sandwiches: sheets {
      title
      image
      body
      excerpt
    }
  }
`

const SheetsSandwiches = ({}) => {
  const pageTitle = "Sheets Sandwiches"
  const { loading, error, data } = useQuery(SANDWICHES_QUERY)

  const items = data ? data.sandwiches : []

  if (error) console.error(error)

  if (loading || error) return <LoadingTemplate title={pageTitle} logo="sheets" />

  return <PageTemplate title={pageTitle} items={items || []} logo="sheets" />
}

export default SheetsSandwiches
