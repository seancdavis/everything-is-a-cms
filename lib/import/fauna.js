const FaunaDB = require("faunadb")

const writeMarkdownFiles = require("../writer")

const q = FaunaDB.query
const client = new FaunaDB.Client({ secret: process.env.FAUNA_API_KEY })

async function getCards() {
  let items = []

  await client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index(process.env.FAUNA_INDEX_NAME))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then((res) => {
      items = res.data.map(({ data }) => ({ ...data, body: data.content }))
    })

  return writeMarkdownFiles("fauna", items)
}

getCards()
