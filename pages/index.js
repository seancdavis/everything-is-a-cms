const sections = [
  {
    title: "API-Based",
    slug: "api-based",
    pages: [
      {
        slug: "bear",
        title: "Bear"
      },
      {
        slug: "contentful",
        title: "Contentful"
      },
      // {
      //   slug: "dropbox",
      //   title: "Dropbox"
      // },
      // {
      //   slug: "fauna",
      //   title: "FaunaDB"
      // },
      // {
      //   slug: "sheets",
      //   title: "Google Sheets"
      // },
      // {
      //   slug: "markdown",
      //   title: "Markdown Files"
      // },
      {
        slug: "trello",
        title: "Trello"
      }
    ]
  },
  {
    title: "File-Based",
    slug: "file-based",
    pages: [
      {
        slug: "bear",
        title: "Bear"
      },
      {
        slug: "contentful",
        title: "Contentful"
      },
      // {
      //   slug: "dropbox",
      //   title: "Dropbox"
      // },
      // {
      //   slug: "fauna",
      //   title: "FaunaDB"
      // },
      // {
      //   slug: "sheets",
      //   title: "Google Sheets"
      // },
      // {
      //   slug: "markdown",
      //   title: "Markdown Files"
      // },
      {
        slug: "trello",
        title: "Trello"
      }
    ]
  }
]

const HomePageCard = ({ logo, title, url }) => {
  return (
    <a href={url} className="text-gray-600 hover:opacity-50 transition-all duration-300">
      <img src={logo} alt="" className="h-24 object-contain w-full mb-4" />
      <h2 className="font-bold text-lg text-center mb-2">{title}</h2>
    </a>
  )
}

export default function HomePage() {
  return (
    <main className="bg-gray-200 min-h-screen pb-16">
      <div className="py-12 text-center">
        <h1 className="text-3xl italic font-bold text-gray-500">Everything is a CMS!</h1>
      </div>
      <div>
        {sections.map((section, idx) => (
          <div key={idx} className="container mx-auto mb-16">
            <h2 className="text-xl font-bold text-gray-500 text-center mb-4">{section.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4 sm:px-0">
              {section.pages.map(({ title, slug }, idx) => (
                <HomePageCard
                  key={idx}
                  title={title}
                  url={`/${section.slug}/${slug}`}
                  logo={`/logos/${slug}.svg`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
