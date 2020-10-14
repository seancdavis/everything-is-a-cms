import fs from "fs"
import path from "path"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"
import glob from "glob"

import PageTemplate from "../../templates/page"

export default function Page({ items }) {
  return <PageTemplate title="Local Files" items={items} />
}

const itemsDirectory = path.join(process.cwd(), "_data/local")
const md = new MarkdownIt()

export async function getStaticProps() {
  const files = glob.sync(path.join(itemsDirectory, `*.md`))
  const items = files.map((filePath) => {
    const slug = path.basename(filePath, path.extname(filePath))
    const fileContents = fs.readFileSync(filePath, "utf8")
    const page = matter(fileContents)
    const content = md.render(page.content)

    return {
      ...page.data,
      content,
      slug
    }
  })

  return {
    props: {
      items: items
    }
  }
}
