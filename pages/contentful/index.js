import compact from "lodash/compact"
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

  await client.getEntries({ content_type: contentTypeId, order: "fields.title" }).then((res) => {
    items = res.items.map((item) => {
      let excerpt = compact(item.fields.body.split("\n"))[0]
      if (excerpt.length > 100) {
        excerpt = `${excerpt.split(/\.|\!\?/)[0]}.`
      }

      return {
        title: item.fields.title,
        excerpt: md.render(excerpt),
        image: item.fields.image.fields.file.url
      }
    })
  })

  return {
    props: {
      items: items
    }
  }
}
