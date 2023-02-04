import Table from "@/components/dashboard/table"
import React from "react"
import DashboardLayout from "../layout"
import Link from "next/link"
import { db } from "@/libs/firebase"
import { ref, onValue, remove } from "firebase/database"
import Swal from "sweetalert2"
import TableTh from "@/components/dashboard/table/tableth"
import TableTd from "@/components/dashboard/table/tabletd"

const Quizzes = () => {
  const [quizzes, setQuizzes] = React.useState([])
  React.useEffect(() => {
    const dbRef = ref(db, "/quizzes")
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const quizzes = []
      for (let id in data) {
        quizzes.push({ id, ...data[id] })
        setQuizzes(quizzes)
      }
    })
  }, [])

  const deleteQuestion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(db, `/quizzes/${id}`))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            })
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.message,
              icon: "error",
              confirmButtonText: "Okey",
            })
          })
      }
    })
  }

  return (
    <>
      <DashboardLayout>
        <h1 className="ml-2 mb-8 font-semibold text-4xl">Quizzes</h1>
        <div className="flex justify-end mr-2"></div>
        <div className="mb-12 hidden md:block">
          <Table>
            <thead className="text-white">
              <tr className="bg-slate-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <TableTh text="ID" customClass={"w-1/12"} />
                <TableTh text="First User" customClass={"w-5/12"} />
                <TableTh text="Last User" customClass={"w-5/12"} />
                <TableTh text="Detail" customClass={"w-2/12"} />
                <TableTh text="Delete" customClass={"w-2/12"} />
              </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {quizzes.map((quiz, index) => (
                <tr
                  key={quiz.id}
                  className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 whitespace-normal">
                  <TableTd text={quiz.quizId} />
                  <TableTd text={quiz.firstUser} customClass="break-all" />
                  <TableTd text={quiz.secondUser} customClass="break-all" />
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    <Link
                      href={{
                        pathname: "/dashboard/quizzes/details",
                        query: { id: quiz.id },
                      }}
                      className="bg-cyan-600 hover:bg-cyan-700 duration-300 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </Link>
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    <button
                      className="bg-red-500 hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteQuestion(quiz.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="block md:hidden">
          {quizzes.map((quiz, index) => (
            <details key={index} className="mb-4">
              <summary className="bg-slate-400 text-white font-bold py-3 px-4 rounded duration-300 whitespace-nowrap overflow-hidden text-ellipsis">
                {quiz.firstUser} - {quiz.lastUser}
              </summary>
              <div className=" bg-slate-200 py-2 rounded-b-md duration-300">
                <div className="flex justify-start gap-4 mt-2 ml-4">
                  <Link
                    href={{
                      pathname: "/dashboard/quizzes/",
                      query: { id: quiz.id },
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Detail
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteQuestion(quiz.id)}>
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

export default Quizzes
