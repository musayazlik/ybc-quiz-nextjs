import React from "react"
import { MdDeleteOutline } from "react-icons/md"

const ClassicQuestionItem = ({ index, question, removeCustomQuestion }) => {
  return (
    <div className="flex justify-between bg-slate-200 px-4 py-4 rounded-lg border-b-4 border-slate-600/50 shadow-md shadow-slate-600/20 ">
      <div className="flex gap-3 items-center">
        <span className="px-2 bg-zinc-500 text-white rounded-md inline-flex justify-center items-center w-8 h-8">
          {index}
        </span>
        <p className="m-0">{question.question}</p>
      </div>
      <button
        onClick={(e) => removeCustomQuestion(e, question.questionId)}
        className="px-2 py-2 border-[3px] border-red-700 bg-red-500 rounded-md text-xl font-semibold text-red-800 shadow-lg shadow-red-600/50 hover:shadow-xl hover:shadow-red-600/60 duration-300 hover:scale-110">
        <MdDeleteOutline />
      </button>
    </div>
  )
}

export default ClassicQuestionItem
