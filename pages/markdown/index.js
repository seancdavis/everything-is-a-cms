import compact from "lodash/compact"
import fs from "fs"
import glob from "glob"
import MarkdownIt from "markdown-it"
import matter from "gray-matter"
import path from "path"

import PageTemplate from "../../templates/page"

import logo from "../../lib/logos/markdown.svg"

const MarkdownSandiwches = ({ items }) => {
  const pageTitle = "Markdown Sandwiches"
  return <PageTemplate title={pageTitle} items={items} logo={logo} />
}

export async function getStaticProps() {
  const itemsDir = path.join(process.cwd(), "_data/markdown")
  const md = new MarkdownIt()
  const extractExcerpt = (file) => {
    let excerpt = compact(file.content.split("\n"))[0]
    if (excerpt.length > 100) {
      excerpt = `${excerpt.split(".")[0]}.`
    }
    file.excerpt = md.render(excerpt)
  }

  const files = glob.sync(path.join(itemsDir, `*.md`))
  const items = files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8")
    const page = matter(fileContents, { excerpt: extractExcerpt })

    return {
      ...page.data,
      content: page.excerpt
    }
  })

  return {
    props: {
      items: items
    }
  }
}

export default MarkdownSandiwches
