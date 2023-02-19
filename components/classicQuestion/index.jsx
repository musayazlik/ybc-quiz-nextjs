import React, { useRef } from "react"
import ClassicQuestionItem from "@/components/classicQuestionItem"
import { AiOutlineWarning } from "react-icons/ai"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { uid } from "uid"
import Swal from "sweetalert2"
import { useRouter } from "next/router"
import { lang } from "@/lang/langT"

const ClassicQuestion = ({ classicQuestions, setClassicQuestions }) => {
  const [parent, enableAnimations] = useAutoAnimate()
  const customQuestionRef = useRef(null)
  const router = useRouter()
  const { locale } = router
  const t = lang(locale)

  const addCustomQuestion = (e) => {
    e.preventDefault()
    const customQuestion = customQuestionRef.current.value.trim()

    if (customQuestion === "") {
      Swal.fire({
        title: t.quizCreate.alerts.error.emptyFields.title,
        text: t.quizCreate.alerts.error.emptyFields.subtitle,
        icon: "error",
        confirmButtonText: t.quizCreate.alerts.error.emptyFields.button,
      })
      return
    }

    if (classicQuestions === "") {
      Swal.fire({
        title: t.quizCreate.alerts.error.allFields.title,
        text: t.quizCreate.alerts.error.allFields.subtitle,
        icon: "error",
        confirmButtonText: t.quizCreate.alerts.error.allFields.button,
      })
      return
    }
    if (classicQuestions.length >= 5) {
      Swal.fire({
        title: t.quizCreate.alerts.error.classicMaxFied.title,
        text: t.quizCreate.alerts.error.classicMaxFied.subtitle,
        icon: "error",
        confirmButtonText: t.quizCreate.alerts.error.classicMaxFied.button,
      })
      customQuestionRef.current.value = ""
      return
    }
    const customQuestionId = uid(10)
    const customQuestionData = {
      questionId: customQuestionId,
      question: customQuestion,
    }
    setClassicQuestions([...classicQuestions, customQuestionData])
    customQuestionRef.current.value = ""
  }

  const removeCustomQuestion = (e, id) => {
    e.preventDefault()
    console.log(id)
    const newCustomQuestions = classicQuestions.filter(
      (question) => question.questionId !== id
    )
    console.log(newCustomQuestions)
    setClassicQuestions(newCustomQuestions)
  }
  return (
    <section className="mt-10">
      <h2 className="mb-2 font-maxbold text-2xl sm:text-3xl text-start underline decoration-sky-500 decoration-4 ">
        {t.quizCreate.classicQuestions.title}
      </h2>
      <p className="mb-2 font-medium text-base text-zinc-800/80 ">
        {t.quizCreate.classicQuestions.subtitle}
      </p>
      <p
        className="mb-4  text-base text-yellow-800/80
		bg-yellow-200/50 border-2 border-yellow-400/50 rounded-md p-2 gap-4 flex items-center font-semibold
			">
        <AiOutlineWarning className="inline-block " fontSize={24} />
        {t.quizCreate.classicQuestions.warning}
      </p>
      <div className="flex mb-6 ">
        <input
          type="text"
          name=""
          id=""
          className="w-full px-3 py-3 border-2 duration-200 border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          ref={customQuestionRef}
        />
        <button
          onClick={addCustomQuestion}
          className="ml-2 px-4 py-2 border-[3px] border-teal-700 bg-teal-500 rounded-md text-xl font-semibold text-teal-800 shadow-lg shadow-teal-600/50 hover:shadow-xl hover:shadow-teal-600/60 duration-300 hover:scale-110 whitespace-nowrap">
          {t.quizCreate.classicQuestions.addQuestion}
        </button>
      </div>
      <div className="flex flex-col gap-4" ref={parent}>
        {classicQuestions.map((question, index) => (
          <ClassicQuestionItem
            key={index + 1}
            index={index + 1}
            question={question}
            removeCustomQuestion={removeCustomQuestion}
          />
        ))}
      </div>
    </section>
  )
}

export default ClassicQuestion
