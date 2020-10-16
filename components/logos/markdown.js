import * as React from "react"

const MarkdownLogo = (props) => {
  return (
    <svg width={1024} height={640} viewBox="0 0 1024 640" {...props}>
      <title>{"Markdown Logo"}</title>
      <path
        d="M950.154 0H73.846C33.127 0 0 33.127 0 73.846v492.308C0 606.875 33.127 640 73.846 640h876.308c40.721 0 73.846-33.125 73.846-73.846V73.846C1024 33.127 990.875 0 950.154 0zM576 511.875L448 512V320l-96 123.077L256 320v192H128V128h128l96 128 96-128 128-.125v384zm191.091 32L608 320h96V128h128v192h96L767.091 543.875z"
        fill="#CBD5E0"
        fillRule="nonzero"
      />
    </svg>
  )
}

export default MarkdownLogo
