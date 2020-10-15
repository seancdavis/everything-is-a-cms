import fs from "fs"
import path from "path"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"
import glob from "glob"

import PageTemplate from "../../templates/page"

const MarkdownSandiwches = ({ items }) => {
  const pageTitle = "Markdown Sandwiches"
  return <PageTemplate title={pageTitle} items={items} />
}

export async function getStaticProps() {
  const itemsDir = path.join(process.cwd(), "_data/markdown")
  const md = new MarkdownIt()

  const files = glob.sync(path.join(itemsDir, `*.md`))
  const items = files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8")
    const page = matter(fileContents)
    const content = md.render(page.content)

    return {
      ...page.data,
      content
    }
  })

  return {
    props: {
      items: items
    }
  }
}

export default MarkdownSandiwches
