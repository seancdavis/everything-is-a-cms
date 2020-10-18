import parseMarkdownFiles from "../../lib/parse-markdown-files"

import PageTemplate from "../../templates/page"

const MarkdownSandwiches = ({ items }) => {
  return <PageTemplate title="Markdown Sandwiches" items={items} logo="markdown" />
}

export async function getStaticProps() {
  const items = parseMarkdownFiles("markdown")

  return {
    props: {
      items: items
    }
  }
}

export default MarkdownSandwiches
