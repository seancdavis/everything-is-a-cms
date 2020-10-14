import React from "react"
import PropTypes from "prop-types"

const Card = ({ content, image, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt="" />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

Card.propTypes = {
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Card
