# Everything is a CMS!

This code supports the demo from the _Everything is a CMS!_ talk from [Next.js Conf 2020](https://nextjs.org/conf/speakers/seancdavis).

Its purpose is to demonstrate that we can easily swap data sources in and out by building abstracted and normalized engines. There are two types of engines, both which are shown within this project:

- API-Based
- File-Based

Currently, the supported data sources are:

- [Bear](https://bear.app/)
- [Contentful](https://www.contentful.com/)
- [Dropbox](https://www.dropbox.com/)
- [Fauna](https://fauna.com/)
- [Google Sheets](https://www.google.com/sheets/about/)
- [Trello](https://trello.com/)

## Getting Started

_Note: This project is built to run in development mode for demo purposes. I haven't tested the build and deploy processes._

To run the project, start the Next server:

    $ npm run dev

And then visit your browser at [localhost:3000](http://localhost:3000/).

See below for working with the various data engines and their drivers (i.e. sources).

### ⚠️ Environment Variables

There are a series of environment variables that are required to work with various data sources:

<table>
  <thead>
    <tr>
      <th>Data Source</th>
      <th>Required Environment Variables</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Bear</td>
      <td>
        <code>BEAR_DATABASE_PATH</code>
      </td>
      <td>Local <b>absolute path</b> to Bear's SQLite database.</td>
    </tr>
    <tr>
      <td>
        <code>BEAR_TAG</code>
      </td>
      <td>Notes are filtered by tag. This is the name of the tag without the <code>#</code>.</td>
    </tr>
    <tr>
      <td rowspan="3">Contentful</td>
      <td>
        <code>CONTENTFUL_ACCESS_TOKEN</code>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>
        <code>CONTENTFUL_CONTENT_TYPE_ID</code>
      </td>
      <td>This is a word you control when creating the content type. Usually, if the type is called <code>Sandwich</code>, the ID will be <code>sandwich</code>. </td>
    </tr>
    <tr>
      <td>
        <code>CONTENTFUL_SPACE_ID</code>
      </td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="2">Dropbox</td>
      <td>
        <code>DROPBOX_ACCESS_TOKEN</code>
      </td>
      <td><a href="https://www.dropbox.com/developers/apps">Create an app</a> to generate a token.</td>
    </tr>
    <tr>
      <td>
        <code>DROPBOX_FILES_DIR</code>
      </td>
      <td>Sandwich files are filtered by directory. The path to the directory in which your files are stored should begin with a slash (e.g. <code>/everything-is-a-cms</code>.</td>
    </tr>
    <tr>
      <td rowspan="2">Fauna</td>
      <td>
        <code>FAUNA_API_KEY</code>
      </td>
      <td></td>
    </tr>
    <tr>
      <td>
        <code>FAUNA_INDEX_NAME</code>
      </td>
      <td>The items are pulled from an index you create with Fauna. This is the name of that index.</td>
    </tr>
    <tr>
      <td rowspan="2">Google Sheets</td>
      <td>
        <code>GOOGLE_CREDENTIALS</code>
      </td>
      <td>Create a service account and then a JSON key. Download the key and store it as an env var, escaping quotes and other characters as necessary.</td>
    </tr>
    <tr>
      <td>
        <code>GOOGLE_SHEET_ID</code>
      </td>
      <td>You can pull this from the URL when viewing the sheet.</td>
    </tr>
    <tr>
      <td rowspan="2">Trello</td>
      <td>
        <code>TRELLO_ACCESS_TOKEN</code>
      </td>
      <td>You can find your API key and generate a token for your user <a href="https://trello.com/app-key">here</a>.</td>
    </tr>
    <tr>
      <td>
        <code>TRELLO_API_KEY</code>
      </td>
      <td></td>
    </tr>
  </tbody>
</table>

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
- `dropbox`
- `fauna`
- `sheets`
- `trello`

## Questions and Feedback

If you have question regarding the implementation here or want to talk about the approach, the quickest way to get ahold of me is on Twitter: [@seancdavis29](https://twitter.com/seancdavis29).
