const fs = require("fs")
const path = require("path")
const slugify = require("slugify")
const yaml = require("js-yaml")

/**
 * writeMarkdownFiles()
 *
 * @param {string} dirName Name of the directory in which to write the files.
 * @param {array} items An array of data objects to convert to markdown format
 * and write.
 *
 * Given an array of items and directory name, parse the data and write to
 * individual markdown files.
 */
const writeMarkdownFiles = (dirName, items) => {
  // Create the directory if it doesn't exist.
  const dir = path.join(__dirname, `../_data/${dirName}`)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  // Clean the directory.
  const existingFiles = fs.readdirSync(dir)
  existingFiles.map((file) => fs.unlinkSync(path.join(dir, file)))
  // Loop through the data objects ...
  items.map((item) => {
    // Format the frontmatter.
    const frontmatter = yaml.safeDump({ title: item.title, image: item.image })
    // Add frontmatter and body together and store.
    const body = `---\n${frontmatter}---\n\n${item.body}`
    // Write the file.
    const filename = `${slugify(item.title).toLowerCase()}.md`
    return fs.writeFileSync(path.join(dir, filename), body)
  })
}

module.exports = writeMarkdownFiles
