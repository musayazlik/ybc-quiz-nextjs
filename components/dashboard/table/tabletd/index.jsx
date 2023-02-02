import React from "react"

const TableTd = ({ text }) => {
  return (
    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
      {text}
    </td>
  )
}

export default TableTd
