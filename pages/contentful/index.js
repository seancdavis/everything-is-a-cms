import MarkdownIt from "markdown-it"
import * as contentful from "contentful"

import PageTemplate from "../../templates/page"

const contentTypeId = "sandwich"

export default function Page({ items }) {
  return <PageTemplate title="Contentful Sandwiches" items={items || []} logo="contentful" />
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
