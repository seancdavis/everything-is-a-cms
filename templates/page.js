import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"

import Card from "../components/card"

const PageTemplate = ({ items, logo, title }) => {
  return (
    <>
      <Head>
        <title>{title} | Everything is a CMS!</title>
      </Head>

      <main className="bg-gray-200 min-h-screen pb-16">
        <div className="py-12 text-center">
          {logo && <img src={`/logos/${logo}.svg`} alt={logo} className="h-16 inline-block mb-4" />}
          <h1 className="text-3xl italic font-bold text-gray-500">{title}</h1>
        </div>
        <a
          href="/"
          className="fixed text-gray-600 text-sm uppercase font-bold underline"
          style={{ left: ".5rem", top: ".5rem" }}
        >
          Home
        </a>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-0">
          {items.map((item, idx) => (
            <Card key={idx} {...item} />
          ))}
        </div>
      </main>
    </>
  )
}

PageTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.string,
  title: PropTypes.string.isRequired
}

PageTemplate.defaultProps = {
  items: []
}

export default PageTemplate
