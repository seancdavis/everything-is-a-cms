# Everything is a CMS!

This code supports the demo from the _Everything is a CMS!_ talk from [Next.js Conf 2020](https://nextjs.org/conf/speakers/seancdavis).

Its purpose is to demonstrate that we can easily swap data sources in and out by building abstracted and normalized engines. There are two types of engines, both which are shown within this project:

- API-Based
- File-Based

Currently, the supported data sources are:

- [Bear](https://bear.app/)
- [Contentful](https://www.contentful.com/)
- [Trello](https://trello.com/)

## Getting Started

_Note: This project is built to run in development mode for demo purposes. I haven't tested the build and deploy processes._

To run the project, start the Next server:

    $ npm run dev

And then visit your browser at [localhost:3000](http://localhost:3000/).

See below for working with the various data engines and their drivers (i.e. sources).

### ⚠️ Environment Variables

There are a series of environment variables that are required to work with various data sources:

| Data Source | Required Environment Variables                                                     |
| ----------- | ---------------------------------------------------------------------------------- |
| Bear        | `BEAR_DATABASE_PATH`<br>`BEAR_DATABASE_USER`<br>`BEAR_TAG`                         |
| Contentful  | `CONTENTFUL_ACCESS_TOKEN`<br>`CONTENTFUL_SPACE_ID`<br>`CONTENTFUL_CONTENT_TYPE_ID` |
| Trello      | `TRELLO_API_KEY`<br>`TRELLO_ACCESS_TOKEN`                                          |

## API-Based Engine

The API-based engine example here is an [Apollo GraphQL server](https://www.apollographql.com/). Its contents live in the `api-engine` directory.

All drivers for this engine live in the `api-engine/lib/drivers` directory and are plugged into the `api-engine/index.js` entry file.

The server must be running to see it in action on the front-end. You can start the server by running:

    $ node api-engine/index.js

You can then work with any of the API-based examples. You can also visit a playground for your GraphQL queries at [localhost:4000](http://localhost:4000/).

## File-Based Engine

The file-based engine has a reader and a writer. The reader is used by the front-end templates to read local markdown files. The writer pulls data from the data sources and writes them to markdown files in the `_data` directory.

You can import files by running the appropriate command-line script:

    $ npm run import:[driver]

Supported drivers are (i.e. replace `[driver]` with one of the following):

- `bear`
- `contentful`
- `trello`

## Questions and Feedback

If you have question regarding the implementation here or want to talk about the approach, the quickest way to get ahold of me is on Twitter: [@seancdavis29](https://twitter.com/seancdavis29).
