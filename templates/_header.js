import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"

const TemplateHeader = ({ items, logo, title }) => {
  return (
    <>
      <Head>
        <title>{title} | Everything is a CMS!</title>
      </Head>

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
    </>
  )
}

TemplateHeader.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired
}

TemplateHeader.defaultProps = {
  items: []
}

export default TemplateHeader
