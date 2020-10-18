const pages = [
  {
    slug: "bear",
    title: "Bear"
  },
  {
    slug: "contentful",
    title: "Contentful"
  },
  {
    slug: "dropbox",
    title: "Dropbox"
  },
  {
    slug: "fauna",
    title: "FaunaDB"
  },
  {
    slug: "sheets",
    title: "Google Sheets"
  },
  {
    slug: "markdown",
    title: "Markdown Files"
  },
  {
    slug: "trello",
    title: "Trello"
  }
]

export default function HomePage() {
  return (
    <main className="bg-gray-200 min-h-screen pb-16">
      <div className="py-12 text-center">
        <h1 className="text-3xl italic font-bold text-gray-500">Everything is a CMS!</h1>
      </div>
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4 sm:px-0">
        {pages.map(({ title, slug }, idx) => (
          <a
            key={idx}
            href={`/${slug}`}
            className="text-gray-600 hover:opacity-50 transition-all duration-300"
          >
            <img src={`/logos/${slug}.svg`} alt="" className="h-24 object-contain w-full mb-4" />
            <h2 className="font-bold text-lg text-center mb-2">{title}</h2>
          </a>
        ))}
      </div>
    </main>
  )
}
