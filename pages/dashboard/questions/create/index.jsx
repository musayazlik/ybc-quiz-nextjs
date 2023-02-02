import React from "react"
import DashboardLayout from "../../layout"
import { db } from "@/libs/firebase"
import { set, ref } from "firebase/database"
import { uid } from "uid"

const Create = () => {
  const createQuestion = (e) => {
    e.preventDefault()
    const question = e.target.question.value
    const answer1 = e.target.answer1.value
    const answer2 = e.target.answer2.value

    const uudi = uid(10)

    const questionSet = {
      questionId: 1,
      question: question,
      answers: [answer1, answer2],
    }

    set(ref(db, "/questions"), {
      questionSet,
    })

    set
    console.log("Question created")
  }
  return (
    <>
      <DashboardLayout>
        <h1 className="ml-2 mb-8 font-semibold text-4xl text-center">
          Question Create
        </h1>

        <div>
          <form className="w-full max-w-lg mx-auto" onSubmit={createQuestion}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-4 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="question">
                  Soru
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="question"
                  type="text"
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                />
              </div>
              <div className="w-full px-3 mb-4 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="answer1">
                  Cevap 1
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="answer1"
                  type="text"
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                />
              </div>
              <div className="w-full px-3 mb-4 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="answer2">
                  Cevap 2
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="answer2"
                  type="text"
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                />
              </div>
            </div>
            <div className="flex justify-center mr-2">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2">
                Created Question
              </button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </>
  )
}

export default Create
