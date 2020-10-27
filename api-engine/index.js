const { ApolloServer, gql } = require("apollo-server")

const bear = require("./lib/drivers/bear")
const contentful = require("./lib/drivers/contentful")
const dropbox = require("./lib/drivers/dropbox")
const fauna = require("./lib/drivers/fauna")
const trello = require("./lib/drivers/trello")

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Sandwich {
    body: String
    excerpt: String
    image: String
    title: String
  }

  type Query {
    bear: [Sandwich]
    contentful: [Sandwich]
    dropbox: [Sandwich]
    fauna: [Sandwich]
    trello: [Sandwich]
  }
`

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    bear: bear,
    contentful: contentful,
    dropbox: dropbox,
    fauna: fauna,
    trello: trello
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
