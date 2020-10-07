import Head from "next/head"
import { GoogleSpreadsheet } from "google-spreadsheet"
import MarkdownIt from "markdown-it"

const pageTitle = "Google Sheets"

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

export async function getStaticProps() {
  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID)
  const credentials = JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_CREDENTIALS)
  await doc.useServiceAccountAuth(credentials)
  await doc.loadInfo()

  const sheet = doc.sheetsByIndex[0]
  const rowData = await sheet.getRows()

  let rows = rowData.map(({ title, image, content }) => ({
    title,
    image,
    content: md.render(content)
  }))

  return {
    props: {
      items: rows
    }
  }
}
