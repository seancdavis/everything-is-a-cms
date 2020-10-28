const { GoogleSpreadsheet } = require("google-spreadsheet")

const writeMarkdownFiles = require("../writer")

async function getCards() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS)
  await doc.useServiceAccountAuth(credentials)
  await doc.loadInfo()

  const sheet = doc.sheetsByIndex[0]
  const rowData = await sheet.getRows()

  let items = rowData.map(({ title, image, content }) => ({
    title,
    image,
    body: content
  }))

  return writeMarkdownFiles("sheets", items)
}

getCards()
