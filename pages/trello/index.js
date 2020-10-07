import Head from "next/head"
import MarkdownIt from "markdown-it"
import Trello from "trello"
import find from "lodash/find"

const pageTitle = "Trello"

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
const trello = new Trello(
  process.env.NEXT_PUBLIC_TRELLO_API_KEY,
  process.env.NEXT_PUBLIC_TRELLO_ACCESS_TOKEN
)

export async function getStaticProps() {
  let items = []
  let board
  let list

  await trello
    .getBoards("me")
    .then((res) => {
      board = find(res, ({ name }) => name === "Everything is a CMS")
    })
    .catch((err) => console.error("--- ERROR ---", err))

  await trello
    .getListsOnBoard(board.id)
    .then((res) => {
      list = find(res, ({ name }) => name === "Ready")
    })
    .catch((err) => console.error("--- ERROR ---", err))

  await trello
    .getCardsOnListWithExtraParams(list.id)
    .then((res) => {
      items = res.map((item) => ({ id: item.id, title: item.name, content: md.render(item.desc) }))
    })
    .catch((err) => console.error("--- ERROR ---", err))

  let requests = items.map((item) => {
    return trello.makeRequest("get", `/1/cards/${item.id}/attachments`).then((res) => {
      item.image = res[0].url
    })
  })

  await Promise.all(requests)

  return {
    props: {
      items: items
    }
  }
}
