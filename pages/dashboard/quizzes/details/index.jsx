import Table from "@/components/dashboard/table"
import React from "react"
import DashboardLayout from "../../layout"
import Link from "next/link"
import { db } from "@/libs/firebase"
import { ref, get, child } from "firebase/database"
import Swal from "sweetalert2"

const Details = ({ quizData }) => {
  console.log(quizData)
  return (
    <>
      <DashboardLayout>
        <h1 className="ml-2 mb-8 font-semibold text-4xl">Quizzes Details</h1>
        <div className="flex justify-end mr-2"></div>
        <div className="mb-12 ">
          <div className="mb-4">
            <label htmlFor="">Quiz Id</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={quizData.quizId}
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="">First User</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={quizData.firstUser}
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="">Second User</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={quizData.secondUser}
              disabled
            />
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default Details

export async function getServerSideProps(context) {
  const { id } = context.query

  const quiz = await get(child(ref(db), `quizzes/${id}`))

  return {
    props: {
      quizData: quiz.val(),
    },
  }
}
