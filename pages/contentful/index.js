import Head from "next/head"
import MarkdownIt from "markdown-it"
import * as contentful from "contentful"

const pageTitle = "Contentful"
const contentTypeId = "sandwich"

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

const client = contentful.createClient({
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
})

export async function getStaticProps() {
  let items = []

  await client.getEntries({ content_type: contentTypeId }).then((res) => {
    items = res.items.map((item) => ({
      title: item.fields.title,
      content: md.render(item.fields.body),
      image: item.fields.image.fields.file.url
    }))
  })

  return {
    props: {
      items: items
    }
  }
}
