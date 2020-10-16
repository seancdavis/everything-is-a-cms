import React from "react"
import PropTypes from "prop-types"

const Card = ({ content, image, title }) => {
  return (
    <div className="rounded-md overflow-hidden shadow-md bg-white">
      <img src={image} alt="" className="h-40 object-cover w-full" />
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="font-serif text-sm text-gray-600"
        />
      </div>
    </div>
  )
}

Card.propTypes = {
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Card
