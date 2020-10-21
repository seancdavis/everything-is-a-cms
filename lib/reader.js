import compact from "lodash/compact"
import fs from "fs"
import glob from "glob"
import MarkdownIt from "markdown-it"
import matter from "gray-matter"
import path from "path"

// Instantiate MarkdownIt instance for parsing markdown to HTML.
const md = new MarkdownIt()

/**
 * extractExcept()
 *
 * @param {string} file File object returned from matter()
 *
 * Helper function for Gray Matter, which sets a file's excerpt from the
 * content. It extracts the first paragraph, but if that first paragraph is more
 * than 100 characters, it then takes the first sentence.
 */
const extractExcerpt = (file) => {
  let excerpt = compact(file.content.split("\n"))[0]
  if (excerpt.length > 100) {
    excerpt = `${excerpt.split(/\.|\!\?/)[0]}.`
  }
  file.excerpt = md.render(excerpt)
}

/**
 * parseMarkdownFiles()
 *
 * @param {string} source Name of the directory containing the markdown files.
 *
 * Given a source directory, parse all markdown files within it and return the
 * array of data objects.
 */
const parseMarkdownFiles = (source) => {
  // Directory containing markdown files.
  const itemsDir = path.join(process.cwd(), `_data/${source}`)
  // Find all markdown files within the directory (assumes .md extension).
  const files = glob.sync(path.join(itemsDir, `*.md`))

  // Loop through each of the files ...
  return files.map((file) => {
    // Read the file.
    const fileContents = fs.readFileSync(file, "utf8")
    // Parse the file, and extract the excerpt.
    const page = matter(fileContents, { excerpt: extractExcerpt })
    // Return the frontmatter, content, and excerpt.
    return {
      ...page.data,
      content: page.content,
      excerpt: page.excerpt
    }
  })
}

export default parseMarkdownFiles
