const compact = require("lodash/compact")
const MarkdownIt = require("markdown-it")

const md = new MarkdownIt()

/**
 * extractExcerpt()
 *
 * @param {string} body The content from which to extract the excerpt.
 *
 * Extracts an excerpt from the main body of content.
 */
module.exports = (body) => {
  let excerpt = compact(body.split("\n"))[0]
  if (excerpt.length > 100) {
    excerpt = `${excerpt.split(/\.|\!\?/)[0]}.`
  }
  return md.render(excerpt)
}
