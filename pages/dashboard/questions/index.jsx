import Table from "@/components/dashboard/table"
import TableTh from "@/components/dashboard/table/tableth"
import TableTd from "@/components/dashboard/table/tabletd"
import React from "react"
import DashboardLayout from "../layout"
import Link from "next/link"
import { db } from "@/libs/firebase"
import { ref, onValue, remove } from "firebase/database"
import Swal from "sweetalert2"

const Questions = () => {
  const [questions, setQuestions] = React.useState([])
  React.useEffect(() => {
    const dbRef = ref(db, "/questions")
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const questions = []
      for (let id in data) {
        questions.push({ id, ...data[id] })
        setQuestions(questions)
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
        remove(ref(db, `/questions/${id}`))
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
        <h1 className="ml-2 mb-8 font-semibold text-4xl">Questions</h1>
        <div className="flex justify-end mr-2">
          <Link
            href={"/dashboard/questions/create"}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 duration-300">
            Add Question
          </Link>
        </div>
        <div className="mb-12 hidden md:block">
          <Table>
            <thead className="text-white">
              <tr className="bg-slate-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <TableTh text="ID" />
                <TableTh text="Questions" customClass={"w-5/12"} />
                <TableTh text="Answers" customClass={"w-5/12"} />
                <TableTh text="Edit" />
                <TableTh text="Delete" />
              </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {questions.map((question, index) => (
                <tr
                  key={question.id}
                  className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 whitespace-normal">
                  <TableTd text={index + 1} />
                  <TableTd text={question.question} customClass="break-all" />
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    <ul className="list-item list-disc justify-center ml-6">
                      {question.answers.map((answer, index) => (
                        <li key={index}>{answer}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    <Link
                      href={{
                        pathname: "/dashboard/questions/edit",
                        query: { id: question.id },
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </Link>
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteQuestion(question.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="block md:hidden">
          {questions.map((question, index) => (
            <details key={index} className="mb-4">
              <summary className="bg-slate-400 text-white font-bold py-3 px-4 rounded duration-300 whitespace-nowrap overflow-hidden text-ellipsis">
                {question.question}
              </summary>
              <div className=" bg-slate-200 py-2 rounded-b-md duration-300">
                <ul className="list-item list-disc justify-center ml-6">
                  {question.answers.map((answer, index) => (
                    <li key={index}>{answer}</li>
                  ))}
                </ul>

                <div className="flex justify-start gap-4 mt-2 ml-4">
                  <Link
                    href={{
                      pathname: "/dashboard/questions/edit",
                      query: { id: question.id },
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteQuestion(question.id)}>
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

export default Questions
