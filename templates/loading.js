import React from "react"
import PropTypes from "prop-types"

import Header from "./_header"

import Loader from "../components/loader"

const LoadingTemplate = ({ items, logo, title }) => {
  return (
    <>
      <main className="bg-gray-200 min-h-screen pb-16">
        <Header title={title} logo={logo} />

        <div className="text-center">
          <Loader />
        </div>
      </main>
    </>
  )
}

LoadingTemplate.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired
}

LoadingTemplate.defaultProps = {}

export default LoadingTemplate
