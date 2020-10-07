import { useRouter } from "next/router"
import ErrorPage from "next/error"
import Head from "next/head"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import remark from "remark"
import html from "remark-html"

export default function Page({ page }) {
  const router = useRouter()

  if (!router.isFallback && !page?.title) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      <div>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </>
  )
}

async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

const pagesDirectory = path.join(process.cwd(), "_pages")

const getPage = slug => {
  const fullPath = path.join(pagesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  return matter(fileContents)
}

export async function getStaticProps({ params }) {
  const page = getPage(params.slug)
  const content = await markdownToHtml(page.content || "")

  return {
    props: {
      page: {
        ...page.data,
        content
      }
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: fs.readdirSync(pagesDirectory).map(filename => {
      return {
        params: {
          slug: path.basename(filename, path.extname(filename))
        }
      }
    }),
    fallback: false
  }
}
