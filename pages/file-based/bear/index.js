import parseMarkdownFiles from "../../../lib/reader"

import PageTemplate from "../../../templates/page"

const BearSandwiches = ({ items }) => {
  return <PageTemplate title="Bear Sandwiches" items={items || []} logo="bear" />
}

export async function getStaticProps() {
  const items = parseMarkdownFiles("bear")

  return {
    props: {
      items: items
    }
  }
}

export default BearSandwiches
