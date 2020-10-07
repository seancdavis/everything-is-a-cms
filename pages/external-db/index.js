import Head from "next/head"
import MarkdownIt from "markdown-it"

import FaunaDB from "faunadb"

const pageTitle = "External Database (Fauna)"

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
const q = FaunaDB.query

export async function getStaticProps() {
  const client = new FaunaDB.Client({ secret: process.env.NEXT_PUBLIC_FAUNA_API_KEY })
  let items = []

  await client
    .query(q.Map(q.Paginate(q.Match(q.Index("all_items"))), q.Lambda("X", q.Get(q.Var("X")))))
    .then((res) => {
      items = res.data.map(({ data }) => ({ ...data, content: md.render(data.content) }))
    })

  return {
    props: {
      items: items
    }
  }
}
