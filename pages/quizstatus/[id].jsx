import React from "react"
import Head from "next/head"
import { tr, en, lang } from "@/lang/langT"
import { get, child, ref } from "firebase/database"
import { useRouter } from "next/router"
import { db } from "@/libs/firebase"
import Swal from "sweetalert2"
import { GiCrown } from "react-icons/gi"

const QuizStatus = ({ questionData }) => {
  const router = useRouter()
  const { locale } = router
  const t = lang(locale)

  const submitPayments = async () => {
    const res = await fetch("/api/payments")
    const data = await res.json()
    console.log(data)
  }

  if (questionData === undefined || questionData === null) {
    return (
      <>
        <div className="container h-screen flex items-center justify-center">
          <div className="grid grid-cols-12">
            <div className="col-span-6 col-start-4 pt-16">
              <h1 className="mb-10 font-maxbold text-4xl sm:text-5xl text-center underline underline-offset-4 decoration-sky-500 decoration-4 ">
                Quiz Status
              </h1>
              <div className="inline-flex justify-center items-center w-full flex-col">
                <p className="text-center border inline-block px-6 py-2 mb-6 shadow-lg shadow-slate-300/50 border-slate-400 bg-slate-200 font-semibold text-slate-600 hover:scale-110 duration-300 cursor-pointer">
                  {router.query.id}
                </p>

                <p className="px-12 text-center mt-2 shadow-lg py-3 shadow-red-300/50 border-red-400 bg-red-200 font-semibold text-red-600 hover:scale-110 duration-300 cursor-pointer border-2 animate-bounce">
                  Quiz Bulunamadı.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="container  mb-8">
          <div className="grid grid-cols-12">
            <div className="col-span-8 col-start-3 pt-16">
              <h1 className="mb-10 font-maxbold text-4xl sm:text-5xl text-center underline underline-offset-4 decoration-sky-500 decoration-4 ">
                Quiz Status
              </h1>
              <div className="flex justify-center">
                <p className="text-center border inline-block px-6 py-2 mb-3 shadow-lg shadow-slate-300/50 border-slate-400 bg-slate-200 font-semibold text-slate-600 ">
                  {router.query.id}
                </p>
              </div>

              {questionData.oppositeStatus === false ? (
                <p className="text-center mt-2 shadow-lg py-2 shadow-amber-300/50 border-amber-400 bg-amber-200 font-semibold text-amber-600 hover:scale-110 duration-300 cursor-pointer border-2 animate-bounce px-6 ">
                  Henüz partneriniz hazırlamış olduğunuz soruları{" "}
                  <span className="underline-offset-4 underline decoration-wavy font-black">
                    cevaplamamış
                  </span>{" "}
                  durumda.
                </p>
              ) : (
                <>
                  <div className="mb-20 bg-slate-50 pb-4">
                    <div className="">
                      <p className="text-center mt-2 mb-3 shadow-lg py-2 shadow-green-300/50 border-green-400 bg-green-200 font-semibold text-green-600  cursor-pointer border-2 animate-bounce ">
                        Partneriniz hazırlamış olduğunuz soruları cevaplamış
                        durumda.
                      </p>
                      <p className="text-center font-semibold">
                        Aşağıda cevaplarını görebilirsiniz.
                      </p>
                    </div>
                    {/* Test Sorular */}
                    <div className="mt-6  bg-slate-50  ">
                      {questionData.testQuestions.map((question, index) => (
                        <div key={index} className="flex flex-col">
                          <p className=" inline-block px-6 py-2 mb-3 bg-slate-200 font-semibold ">
                            {index + 1} - {question.question}
                          </p>
                          <p className=" px-6 py-2 mb-3 flex gap-4">
                            {question.answers.map((answer, index) => (
                              <span
                                key={index}
                                className={`px-4 py-2 relative ${
                                  Number(question.answer) === index
                                    ? "bg-emerald-500 border-2 border-emerald-600 text-white hover:scale-110 duration-300 z-10 "
                                    : "bg-slate-400 border-2 border-slate-500 text-white"
                                } `}>
                                {answer}
                                {Number(question.answer) === index && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 inline-block ml-2 absolute -top-3 -right-3 bg-emerald-500 border-2 shadow-md shadow-emerald-700/50 border-emerald-700/50 rounded-lg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </span>
                            ))}
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* Klasik Sorular */}
                    <div className="">
                      {questionData.premiumFirstUser === true ? (
                        questionData.classicQuestions.map((question, index) => (
                          <div key={index} className="flex flex-col">
                            <p className=" inline-block px-6 py-2 mb-3 bg-slate-200 font-semibold ">
                              {index + 1} - {question.question}
                            </p>
                            <p className=" px-6 py-2 mb-3 flex gap-4">
                              {question.answer}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4">
                          <div className="flex flex-col px-4 mt-4 pt-4 relative h-80">
                            <div className="absolute left-0 top-0 w-full bg-yellow-400/60 h-80 rounded-lg flex justify-center items-center px-8 backdrop-blur-sm flex-col gap-6">
                              <p className="flex flex-col text-center font-semibold gap-6 text-yellow-700">
                                <span className="text-xl">
                                  Klasik Soruların cevaplarını görmek için
                                </span>
                                <span className="font-maxbold text-3xl flex items-center gap-4 justify-center">
                                  <GiCrown fontSize={40} />
                                  Premium Üyelik
                                </span>
                                <span className="text-xl">
                                  {" "}
                                  satın almanız gerekmektedir.
                                </span>
                              </p>
                              <button
                                onClick={() => {
                                  submitPayments()
                                }}
                                className=" bottom-0 left-0 right-0 mx-auto mb-4 px-8 py-3 bg-yellow-500/60 border-2 border-yellow-600 text-yellow-700 font-semibold rounded-lg shadow-lg hover:scale-110 duration-300">
                                Premium Üyelik Satın Al
                              </button>
                            </div>
                            <p>fsdfdsfdsfsdfdfff</p>
                            <p>fsdfdsfdsfsdfdfff</p>
                            <p>fsdfdsfdsfsdfdfff</p>
                            <p>fsdfdsfdsfsdfdfff</p>
                            <p>fsdfdsfdsfsdfdfff</p>
                            <p>fsdfdsfdsfsdfdfff</p>
                            <p>fsdfdsfdsfsdfdfff</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default QuizStatus

export async function getServerSideProps(context) {
  const { id } = context.query

  try {
    const question = await get(child(ref(db), `quizzes/${id}`))
    return {
      props: {
        questionData: question.val(),
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}
