import Head from "next/head"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"
import glob from "glob"

const pageTitle = "Bear"

export default function Page({ pages }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div>
        <a href="/">Home</a>
        <h1>{pageTitle}</h1>
        {pages.map((page, idx) => (
          <div key={idx}>
            <h2>{page.title}</h2>
            <img src={page.image} alt="" />
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        ))}
      </div>
    </>
  )
}

const pagesDirectory = path.join(process.cwd(), "_data/bear")
const md = new MarkdownIt()

export async function getStaticProps() {
  const files = glob.sync(path.join(pagesDirectory, `*.md`))
  const pages = files.map((filePath) => {
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
      pages: pages
    }
  }
}
