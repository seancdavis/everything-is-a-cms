const fs = require("fs")
const matter = require("gray-matter")
const md = require("markdown-it")()
const Sequelize = require("sequelize")
const { Op } = require("sequelize")
const slugify = require("slugify")
const trimStart = require("lodash/trimStart")

const outputDir = "_data/bear"
const tagTitle = "everything-is-a-cms"

const seq = new Sequelize("database", process.env.BEAR_DATABASE_USER, null, {
  dialect: "sqlite",
  storage: process.env.BEAR_DATABASE_PATH
})

/**
 * Definition of note in SQLite database.
 */
const Note = seq.define(
  "ZSFNOTE",
  {
    id: { type: Sequelize.STRING, field: "Z_PK", primaryKey: true },
    title: { type: Sequelize.STRING, field: "ZTITLE" },
    body: { type: Sequelize.STRING, field: "ZTEXT" },
    updatedAt: { type: Sequelize.DATE, field: "ZMODIFICATIONDATE" }
  },
  {
    tableName: "ZSFNOTE"
  }
)

const Tag = seq.define(
  "ZSFNOTETAG",
  {
    id: { type: Sequelize.NUMBER, field: "Z_PK", primaryKey: true },
    title: { type: Sequelize.STRING, field: "ZTITLE" }
  },
  {
    tableName: "ZSFNOTETAG"
  }
)

const NoteTagJoin = seq.define(
  "Z_7TAGS",
  {
    noteId: { type: Sequelize.NUMBER, field: "Z_7NOTES" },
    tagId: { type: Sequelize.NUMBER, field: "Z_14TAGS" }
  },
  {
    tableName: "Z_7TAGS"
  }
)

/**
 * Extract and transform note's dataValue object.
 */
const extractNoteData = (data) => {
  return {
    ...data.dataValues,
    slug: slugify(data.dataValues.title).toLowerCase(),
    updatedAt: convertDate(data.dataValues.updatedAt)
  }
}

/**
 * Determine if a note has frontmatter, parse it accordingly, and then render
 * markdown.
 */
const parseNote = (note) => {
  const lines = note.body.split("\n")

  if (lines[0][0] === "#" && lines[1] === "---" && lines[2].startsWith("title:")) {
    note.body = note.body.slice(note.body.indexOf("\n") + 1)
  }

  const tagReplacePattern = new RegExp(`#${tagTitle}`, "g")
  note.body = note.body.replace(tagReplacePattern, "")

  let item = matter(note.body)
  item.content = trimStart(item.content)

  item.html = md.render(item.content)

  return { note: { ...note }, ...item }
}

/**
 * Date in Bear's database is a timestamp of the time passed since Jan 1, 2000.
 * The timestamp at Jan 1, 2000 was 946684800. And then we need to multiply by
 * 1000, because JS timestamps are in milliseconds.
 */
const convertDate = (date) => new Date((date + 946684800) * 1000)

/**
 * Write to file
 */
const writeFile = (item) => {
  if (!item.note.title) return
  // const itemBody = `---`
  fs.writeFileSync(`./${outputDir}/${item.note.slug}.md`, item.note.body)
}

// Find the appropriate tag.
Tag.findAll({
  limit: 1,
  where: {
    title: tagTitle
  },
  attributes: ["id", "title"]
}).then((tagData) => {
  const tagId = tagData[0].dataValues.id

  NoteTagJoin.findAll({
    attributes: ["tagId", "noteId"],
    where: {
      tagId: tagId
    }
  }).then((joinData) => {
    const noteIds = joinData.map(({ dataValues: { noteId } }) => ({ id: noteId }))

    Note.findAll({
      attributes: ["title", "body", "updatedAt"],
      where: {
        [Op.or]: noteIds
      }
    }).then((data) => {
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

      data.map((node) => {
        const extractedData = extractNoteData(node)
        const note = parseNote(extractedData)
        writeFile(note)
      })
    })
  })
})
