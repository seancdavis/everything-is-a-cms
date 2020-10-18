const Trello = require("trello")
const find = require("lodash/find")

const trello = new Trello(process.env.TRELLO_API_KEY, process.env.TRELLO_ACCESS_TOKEN)

module.exports = async function getCards() {
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
      items = res.map((item) => ({ id: item.id, title: item.name, body: item.desc }))
    })
    .catch((err) => console.error("--- ERROR ---", err))

  let requests = items.map((item) => {
    return trello.makeRequest("get", `/1/cards/${item.id}/attachments`).then((res) => {
      item.image = res[0].url
    })
  })

  await Promise.all(requests)

  return items
}
