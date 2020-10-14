import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"

import Card from "../components/card"

const PageTemplate = ({ items, title }) => {
  return (
    <>
      <Head>
        <title>{title} | Everything is a CMS!</title>
      </Head>

      <div>
        <a href="/">Home</a>
        <h1>{title}</h1>
        {items.map((item, idx) => (
          <Card key={idx} {...item} />
        ))}
      </div>
    </>
  )
}

PageTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

PageTemplate.defaultProps = {
  items: []
}

export default PageTemplate
