import Table from "@/components/dashboard/table"
import TableTh from "@/components/dashboard/table/tableth"
import TableTd from "@/components/dashboard/table/tabletd"
import React from "react"
import DashboardLayout from "../layout"
import Link from "next/link"

const Questions = () => {
  return (
    <>
      <DashboardLayout>
        <h1 className="ml-2 mb-8 font-semibold text-4xl">Questions</h1>
        <div className="flex justify-end mr-2">
          <Link
            href={"/dashboard/questions/create"}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2">
            Add Question
          </Link>
        </div>
        <Table>
          <thead className="bg-gray-50">
            <tr>
              <TableTh text="ID" />
              <TableTh text="Questions" />
              <TableTh text="Answers" />
              <TableTh text="Edit" />
              <TableTh text="Delete" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <TableTd text="1" />
              <TableTd text="Lorem ipsum dolor sit amet consectetur " />
              <td>
                <ul className="list-item list-disc justify-center ml-6">
                  <li>Evet</li>
                  <li>Hayır</li>
                </ul>
              </td>
              <td>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
              </td>
              <td>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </DashboardLayout>
    </>
  )
}

export default Questions
