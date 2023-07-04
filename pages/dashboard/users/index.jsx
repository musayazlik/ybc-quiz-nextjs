import React from "react"
import DashboardLayout from "../layout"
import { db, auth } from "@/libs/firebase"
import Table from "@/components/dashboard/table"
import Link from "next/link"
import { ref, onValue, remove } from "firebase/database"
import Swal from "sweetalert2"
import TableTh from "@/components/dashboard/table/tableth"
import TableTd from "@/components/dashboard/table/tabletd"
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai"

const Users = () => {
  const [users, setUsers] = React.useState([])
  React.useEffect(() => {
    const dbRef = ref(db, "/users")
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const usersData = []
      for (let id in data) {
        usersData.push({ id, ...data[id] })
        setUsers(usersData)
      }
    })
  }, [])

  return (
    <>
      <DashboardLayout>
        <h1 className="ml-2 mb-8 font-semibold text-4xl">Users</h1>
        <div className="flex justify-end mr-2"></div>
        <div className="mb-12 hidden md:block">
          <Table>
            <thead className="text-white">
              <tr className="bg-slate-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <TableTh text="#" customClass={"w-1/12"} />
                <TableTh text="Name" customClass={"w-5/12"} />
                <TableTh text="Surname" customClass={"w-5/12"} />
                <TableTh text="Role" customClass={"w-5/12"} />
                <TableTh text="Status" customClass={"w-5/12"} />
                <TableTh text="" customClass={"w-2/12"} />
              </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
              <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 whitespace-normal">
                <TableTd text={1} />
                <TableTd text={"Musa"} customClass="break-all" />
                <TableTd text={"Yazlık"} customClass="break-all" />
                <TableTd text={"Admin"} customClass="break-all" />
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  <Link
                    href={"dfsdfdf"}
                    className="bg-emerald-500 hover:bg-emerald-500 duration-300 text-white font-bold py-2 px-4 rounded">
                    Aktif
                  </Link>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 flex gap-3">
                  <Link
                    href={"dfsdfdf"}
                    className="bg-cyan-600 hover:bg-cyan-700 duration-300 text-white font-bold py-2 px-4 rounded flex gap-2 items-center">
                    <AiTwotoneEdit />
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded flex gap-2 items-center"
                    // onClick={() => deleteQuestion(quiz.id)}
                  >
                    <AiTwotoneDelete />
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 whitespace-normal">
                <TableTd text={1} />
                <TableTd text={"Deneme"} customClass="break-all" />
                <TableTd text={"Kullanıcı"} customClass="break-all" />
                <TableTd text={"User"} customClass="break-all" />
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  <Link
                    href={"dfsdfdf"}
                    className="bg-red-500 hover:bg-red-500 duration-300 text-white font-bold py-2 px-4 rounded">
                    Pasif
                  </Link>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 flex gap-3">
                  <Link
                    href={"dfsdfdf"}
                    className="bg-cyan-600 hover:bg-cyan-700 duration-300 text-white font-bold py-2 px-4 rounded flex gap-2 items-center">
                    <AiTwotoneEdit />
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded flex gap-2 items-center"
                    // onClick={() => deleteQuestion(quiz.id)}
                  >
                    <AiTwotoneDelete />
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className="block md:hidden">
          {users.map((quiz, index) => (
            <details key={index} className="mb-4">
              <summary className="bg-slate-400 text-white font-bold py-3 px-4 rounded duration-300 whitespace-nowrap overflow-hidden text-ellipsis"></summary>
              <div className=" bg-slate-200 py-2 rounded-b-md duration-300">
                <div className="flex justify-start gap-4 mt-2 ml-4">
                  <Link
                    href="/dashboard/quizzes/"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Detail
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    // onClick={() => deleteQuestion(quiz.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </details>
          ))}
        </div>
      </DashboardLayout>
    </>
  )
}

export default Users
