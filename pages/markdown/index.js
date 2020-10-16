import compact from "lodash/compact"
import fs from "fs"
import glob from "glob"
import MarkdownIt from "markdown-it"
import matter from "gray-matter"
import path from "path"

import parseMarkdownFiles from "../../lib/parse-markdown-files"

import PageTemplate from "../../templates/page"

const MarkdownSandiwches = ({ items }) => {
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

export default MarkdownSandiwches
