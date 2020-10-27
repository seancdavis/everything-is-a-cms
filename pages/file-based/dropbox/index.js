import parseMarkdownFiles from "../../../lib/reader"

import PageTemplate from "../../../templates/page"

const DropboxSandwiches = ({ items }) => {
  return <PageTemplate title="Dropbox Sandwiches" items={items || []} logo="dropbox" />
}

export async function getStaticProps() {
  const items = parseMarkdownFiles("dropbox")

  return {
    props: {
      items: items
    }
  }
}

export default DropboxSandwiches
