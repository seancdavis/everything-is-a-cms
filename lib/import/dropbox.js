const matter = require("gray-matter")
const { Dropbox } = require("dropbox")

const writeMarkdownFiles = require("../writer")

async function getCards() {
  let items = []
  let files = []

  const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN })

  await dbx.filesListFolder({ path: "/everything-is-a-cms" }).then((response) => {
    if (!response.result || !response.result.entries) {
      return
    }
    files = response.result.entries.map(({ path_display }) => path_display)
  })

  let requests = []

  files.map(async (file) => {
    const request = dbx.filesDownload({ path: file })
    requests.push(request)
  })

  await Promise.all(requests).then((values) => {
    items = values.map((res) => {
      if (!res.result || !res.result.fileBinary) {
        return {}
      }

      const fileContent = res.result.fileBinary.toString()
      const data = matter(fileContent)

      return { ...data.data, body: data.content }
    })
  })

  return writeMarkdownFiles("dropbox", items)
}

getCards()
