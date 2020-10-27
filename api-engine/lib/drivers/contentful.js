const contentful = require("contentful")

const extractExcerpt = require("../extract-excerpt")

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID
})

module.exports = async function getCards() {
  let items = []

  await client
    .getEntries({ content_type: process.env.CONTENTFUL_CONTENT_TYPE_ID, order: "fields.title" })
    .then((res) => {
      items = res.items.map((item) => {
        return {
          id: item.sys.id,
          title: item.fields.title,
          excerpt: extractExcerpt(item.fields.body),
          image: item.fields.image.fields.file.url
        }
      })
    })

  return items
}
