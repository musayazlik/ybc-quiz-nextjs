import React from "react"
import { tr, en, lang } from "@/lang/langT"
import { useRouter } from "next/router"
import Link from "next/link"
import { get, ref, update } from "firebase/database"
import { db } from "@/libs/firebase"
import Swal from "sweetalert2"
import { GiQueenCrown } from "react-icons/gi"

const QuizSolve = ({ id, quizData }) => {
  const [quizTestStatus, setQuizTestStatus] = React.useState(false)
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [questions, setQuestions] = React.useState([
    ...quizData?.testQuestions,
    ...quizData?.classicQuestions,
  ])
  const [quizValue, setQuizValue] = React.useState({})
  const router = useRouter()
  const { locale } = router
  const t = locale === lang.en ? en : tr

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleAnswer = (e) => {
    const answer = e.target.value
    const newQuestions = [...questions]
    newQuestions[currentQuestion].answer = answer
    setQuestions(newQuestions)
    setQuizValue({ ...quizValue, questions: newQuestions })
  }

  const handleFinish = async () => {
    try {
      update(ref(db, `quizzes/${id}`), {
        testQuestions: quizValue.questions.slice(
          0,
          quizData.testQuestions.length
        ),
        classicQuestions: quizValue.questions.slice(
          quizData.testQuestions.length
        ),
        oppositeStatus: true,
        premiumSecondUser: false,
      }).then(() => {
        Swal.fire({
          icon: "success",
          title: t.quizSolve.solved.alerts.success.title,
          text: quizData.premiumSecondUser
            ? t.quizSolve.solved.alerts.success.subtitleEdit
            : t.quizSolve.solved.alerts.success.subtitle,
          showConfirmButton: true,
          confirmButtonText: t.quizSolve.solved.alerts.success.button,
        }).then(() => {
          router.push("/")
        })
      })
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: t.quizSolve.solved.alerts.error.title,
        subtitle: t.quizSolve.solved.alerts.error.subtitle,
        showConfirmButton: true,
        confirmButtonText: t.quizSolve.solved.alerts.error.button,
      })
    }
  }

  const quizEditStatus = () => {
    update(ref(db, `quizzes/${id}`), {
      oppositeStatus: false,
      premiumSecondUser: true,
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Quiz başarıyla düzenlenebilir hale getirildi",
        showConfirmButton: true,

        confirmButtonText: "Tamam",
      }).then(() => {
        router.push(`quizsolve?id=${id}`)
      })
    })
  }

  if (!id || quizData === undefined) {
    return (
      <>
        <div className="container flex justify-center items-center h-screen">
          <section className="">
            <h1 className="mb-8 sm:mb-10 font-maxbold  text-4xl sm:text-6xl xl:text-7xl text-center underline underline-offset-4 decoration-sky-500 decoration-4 ">
              {t.quizSolve.error.title}
            </h1>
            <p className="mb-10 font-medium text-xl text-center text-gray-500 flex flex-col  ">
              <span className="font-semibold text-gray-800">
                {t.quizSolve.error.subtitle1}
              </span>
              <span className="text-lg">{t.quizSolve.error.subtitle2}</span>
            </p>

            <div className="flex justify-center">
              <Link
                href={"/quiz"}
                className="border-4 border-violet-700 px-8 py-4 rounded-lg shadow-lg shadow-violet-300/50 font-semibold text-xl hover:scale-110 duration-200 hover:shadow-xl hover:shadow-violet-400/50 bg-violet-500  text-violet-800 ">
                {t.quizSolve.error.button}
              </Link>
            </div>
          </section>
        </div>
      </>
    )
  } else if (quizData.oppositeStatus === true) {
    return (
      <>
        <div className="container flex justify-center items-center h-screen">
          <section className="flex flex-col items-center">
            <h1 className="mb-8 sm:mb-10 font-maxbold  text-4xl sm:text-6xl xl:text-7xl text-center underline underline-offset-4 decoration-sky-500 decoration-4 relative inline-flex ">
              {t.quizSolve.solved.title}
            </h1>
            <p className="mb-10 text-center text-gray-800 flex flex-col  ">
              <span className="text-xl font-semibold">
                {t.quizSolve.solved.subtitle}
              </span>
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href={"/"}
                className="border-4 border-violet-700 px-8 py-4 rounded-lg shadow-lg shadow-violet-300/50 font-semibold text-xl hover:scale-110 duration-200 hover:shadow-xl hover:shadow-violet-400/50 bg-violet-500  text-violet-800 ">
                {t.quizSolve.solved.button}
              </Link>
              <button
                className="border-4 border-emerald-700 px-8 py-4 rounded-lg shadow-lg shadow-emerald-300/50 font-semibold text-xl hover:scale-110 duration-200 hover:shadow-xl hover:shadow-emerald-400/50 bg-emerald-500  text-emerald-800 relative "
                onClick={quizEditStatus}>
                {t.quizSolve.solved.buttonEdit}
                <span>
                  <GiQueenCrown
                    className="inline-block ml-2 absolute -top-4 -right-4 bg-emerald-600 text-white p-1 rounded-md border-[3px] shadow-lg shadow-emerald-700 border-emerald-700 "
                    fontSize={32}
                  />
                </span>
              </button>
            </div>
          </section>
        </div>
      </>
    )
  } else {
    return (
      <>
        {quizTestStatus ? (
          <div className="container grid grid-cols-12 place-content-center h-screen w-full">
            <div className="col-span-3 px-4 py-4 relative hidden lg:flex">
              <div className="bg-gray-600 h-40 sticky top-12 w-full flex justify-center items-center text-white ">
                Reklamlar
              </div>
            </div>
            <div className=" w-full col-span-6 px-6">
              <h1 className="mb-8 sm:mb-10 font-maxbold  text-4xl sm:text-6xl xl:text-7xl text-center underline underline-offset-4 decoration-sky-500 decoration-4 ">
                {t.quizSolve.title}
              </h1>

              <div className="flex justify-center w-full max-w-2xl mx-auto text-center">
                <div className="flex mb-8 bg-zinc-100 px-6 py-12 rounded-lg justify-center w-full shadow-lg shadow-zinc-300/40 border-2 border-zinc-600/30 border-b-4">
                  {questions.map((question, index) => {
                    return (
                      <div className="gap-8 flex flex-col" key={index}>
                        {currentQuestion === index && (
                          <>
                            <h1 className="text-2xl font-semibold">
                              {question.question}
                            </h1>
                            <div className="flex justify-center w-full gap-12 ">
                              {question.answers ? (
                                question.answers.map((option, index) => {
                                  return (
                                    <label
                                      className={`relative font-semibold duration-300 ${
                                        question.answer === index.toString()
                                          ? "bg-emerald-400 border-[3px] border-emerald-800/50 shadow-md shadow-emerald-400/50 rounded-sm text-white px-5 py-3 scale-110"
                                          : "bg-slate-400 border-[3px] border-slate-800/50 shadow-md shadow-slate-400/50 rounded-sm text-white px-5 py-3"
                                      }`}>
                                      <input
                                        type="radio"
                                        name="answer"
                                        value={index}
                                        className="absolute opacity-0 w-full h-full cursor-pointer top-0 left-0 "
                                        onChange={handleAnswer}
                                        checked={
                                          question.answer === index.toString()
                                        }
                                      />
                                      {option}
                                    </label>
                                  )
                                })
                              ) : (
                                <input
                                  type="text"
                                  className="bg-white border-2 border-gray-300 focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-md shadow-sm w-full"
                                  placeholder="Cevabınızı buraya yazın"
                                  onChange={handleAnswer}
                                  value={question.answer}
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex gap-6 justify-center ">
                {currentQuestion > 0 && (
                  <button
                    className="bg-red-500 border-b-4 border-red-600 text-white font-bold py-2 px-4 rounded hover:scale-110 shadow-lg hover:shadow-red-500/50 duration-300"
                    onClick={handlePrevQuestion}>
                    Önceki Soru
                  </button>
                )}
                {currentQuestion < questions.length - 1 && (
                  <button
                    className="bg-green-500 border-b-4 border-green-600 text-white font-bold py-2 px-4 rounded hover:scale-110 shadow-lg hover:shadow-green-500/50 duration-300"
                    onClick={handleNextQuestion}>
                    Sonraki Soru
                  </button>
                )}
                {currentQuestion === questions.length - 1 && (
                  <button
                    className="bg-cyan-500 border-b-4 border-cyan-600 text-white font-bold py-2 px-4 rounded hover:scale-110 shadow-lg hover:shadow-cyan-500/50 duration-300"
                    onClick={handleFinish}>
                    Testi Bitir
                  </button>
                )}
              </div>
            </div>
            <div className="col-span-3 px-4 py-4 relative hidden lg:flex">
              <div className="bg-gray-600 h-40 sticky top-12 w-full flex justify-center items-center text-white ">
                Reklamlar
              </div>
            </div>
          </div>
        ) : (
          <div className="container flex justify-center items-center h-screen">
            <section className=" flex flex-col items-center">
              <h1 className="mb-8 sm:mb-10 font-maxbold  text-4xl sm:text-6xl xl:text-7xl text-center underline underline-offset-4 decoration-sky-500 decoration-4 relative inline-flex ">
                {t.quizSolve.title}
                {quizData.premiumSecondUser ? (
                  <span className="absolute  text-yellow-400 flex justify-center items-center py-2 px-3 -top-14 -left-5">
                    <GiQueenCrown className="inline-block " />
                  </span>
                ) : (
                  ""
                )}
              </h1>
              <p className="mb-10 font-medium text-xl text-center text-gray-500 flex flex-col  ">
                <span className="font-semibold text-gray-800">
                  {quizData.premiumSecondUser
                    ? t.quizSolve.subtitle1Edit
                    : t.quizSolve.subtitle1}
                </span>
                <span className="text-lg">{t.quizSolve.subtitle2}</span>
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => setQuizTestStatus(true)}
                  href={"/quiz"}
                  className="border-4 border-violet-700 px-8 py-4 rounded-lg shadow-lg shadow-violet-300/50 font-semibold text-xl hover:scale-110 duration-200 hover:shadow-xl hover:shadow-violet-400/50 bg-violet-500  text-violet-800 ">
                  {t.quizSolve.button}
                </button>
              </div>
            </section>
          </div>
        )}
      </>
    )
  }
}

export default QuizSolve

export async function getServerSideProps(context) {
  const { id } = await context?.query
  let data = null
  await get(ref(db, "quizzes/" + id))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val()
      } else {
        console.log("No data available")
      }
    })
    .catch((error) => {
      console.error(error)
    })

  return {
    props: {
      id: id,
      quizData: data,
    },
  }
}
