import React from "react"

const TableTh = ({ text, customClass }) => {
  return (
    <th className={`p-3 text-left ${customClass && customClass}`}>{text}</th>
  )
}

export default TableTh
