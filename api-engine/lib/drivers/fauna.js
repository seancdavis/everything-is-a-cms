const FaunaDB = require("faunadb")

const extractExcerpt = require("../extract-excerpt")

const q = FaunaDB.query
const client = new FaunaDB.Client({ secret: process.env.FAUNA_API_KEY })

module.exports = async function getCards() {
  let items = []

  await client
    .query(q.Map(q.Paginate(q.Match(q.Index("all_items"))), q.Lambda("X", q.Get(q.Var("X")))))
    .then((res) => {
      items = res.data.map(({ data }) => ({ ...data, excerpt: extractExcerpt(data.content) }))
    })

  return items
}
