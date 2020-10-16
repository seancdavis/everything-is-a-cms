import compact from "lodash/compact"
import fs from "fs"
import glob from "glob"
import MarkdownIt from "markdown-it"
import matter from "gray-matter"
import path from "path"

import PageTemplate from "../../templates/page"

const MarkdownSandiwches = ({ items }) => {
  return <PageTemplate title="Markdown Sandwiches" items={items} logo="markdown" />
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
