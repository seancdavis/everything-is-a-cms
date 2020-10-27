import parseMarkdownFiles from "../../../lib/reader"

import PageTemplate from "../../../templates/page"

const ContentfulSandwiches = ({ items }) => {
  return <PageTemplate title="Contentful Sandwiches" items={items || []} logo="contentful" />
}

export async function getStaticProps() {
  const items = parseMarkdownFiles("contentful")

  return {
    props: {
      items: items
    }
  }
}

export default ContentfulSandwiches
