import React from "react"

const TableTd = ({ text, customClass }) => {
  return (
    <td
      className={`border-grey-light border hover:bg-gray-100 p-3 ${
        customClass && customClass
      }`}>
      {text}
    </td>
  )
}

export default TableTd
