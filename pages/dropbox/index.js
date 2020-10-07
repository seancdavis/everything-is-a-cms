import Head from "next/head"
import MarkdownIt from "markdown-it"
import matter from "gray-matter"
import { Dropbox } from "dropbox"

const pageTitle = "Dropbox"

export default function Page({ items }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div>
        <a href="/">Home</a>
        <h1>{pageTitle}</h1>
        {items.map((item, idx) => (
          <div key={idx}>
            <h2>{item.title}</h2>
            <img src={item.image} alt="" />
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        ))}
      </div>
    </>
  )
}

const md = new MarkdownIt()

export async function getStaticProps() {
  let items = []
  let files = []

  const dbx = new Dropbox({ accessToken: process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN })

  await dbx.filesListFolder({ path: "/everything-is-a-cms" }).then((response) => {
    if (!response.result || !response.result.entries) {
      return
    }
    files = response.result.entries.map(({ path_display }) => path_display)
  })

  let requests = []

  files.map(async (file) => {
    const request = dbx.filesDownload({ path: file })
    requests.push(request)
  })

  await Promise.all(requests).then((values) => {
    items = values.map((res) => {
      if (!res.result || !res.result.fileBinary) {
        return {}
      }

      const fileContent = res.result.fileBinary.toString()
      const data = matter(fileContent)

      return { ...data.data, content: md.render(data.content) }
    })
  })

  console.log(files, items)

  return {
    props: {
      items: items
    }
  }
}
