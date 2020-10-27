import parseMarkdownFiles from "../../../lib/reader"

import PageTemplate from "../../../templates/page"

const FaunaSandwiches = ({ items }) => {
  return <PageTemplate title="Fauna Sandwiches" items={items || []} logo="fauna" />
}

export async function getStaticProps() {
  const items = parseMarkdownFiles("fauna")

  return {
    props: {
      items: items
    }
  }
}

export default FaunaSandwiches
