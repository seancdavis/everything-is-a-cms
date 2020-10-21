import parseMarkdownFiles from "../../../lib/reader"

import PageTemplate from "../../../templates/page"

const TrelloSandwiches = ({ items }) => {
  return <PageTemplate title="Trello Sandwiches" items={items || []} logo="trello" />
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
