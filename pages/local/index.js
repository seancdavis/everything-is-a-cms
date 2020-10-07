import Head from "next/head"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"
import glob from "glob"

const pageTitle = "Local Markdown Files"

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
            <a href={`/local/${page.slug}`}>
              <h2>{page.title}</h2>
            </a>
            <img src={page.image} alt="" />
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        ))}
      </div>
    </>
  )
}

const pagesDirectory = path.join(process.cwd(), "_local")
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
