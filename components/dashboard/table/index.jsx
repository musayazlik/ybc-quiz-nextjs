import React from "react"

const Table = ({ children }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Table
