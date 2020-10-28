import parseMarkdownFiles from "../../../lib/reader"

import PageTemplate from "../../../templates/page"

const SheetsSandwiches = ({ items }) => {
  return <PageTemplate title="Sheets Sandwiches" items={items || []} logo="sheets" />
}

export async function getStaticProps() {
  const items = parseMarkdownFiles("sheets")

  return {
    props: {
      items: items
    }
  }
}

export default SheetsSandwiches
