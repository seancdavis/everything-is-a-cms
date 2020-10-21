import React from "react"
import PropTypes from "prop-types"

import Header from "./_header"

import Card from "../components/card"

const PageTemplate = ({ items, logo, title }) => {
  return (
    <>
      <main className="bg-gray-200 min-h-screen pb-16">
        <Header title={title} logo={logo} />

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
