import React from "react"
import Head from "next/head"
import { tr, en, lang } from "@/lang/langT"
import { useRouter } from "next/router"
import { db } from "@/libs/firebase"
import { ref, onValue, push, get } from "firebase/database"
import { uid } from "uid"
import Swal from "sweetalert2"

const QuizCreate = ({ questions }) => {
  let selectedQuestions = []
  const router = useRouter()
  const { locale } = router
  const t = lang(locale)

  const changeLanguage = (e) => {
    const locale = e.target.value
    router.push(router.pathname, router.asPath, { locale })
  }

  console.log(questions)

  const createQuizHandle = (e) => {
    e.preventDefault()
    const firstUser = e.target.firstUser.value
    const secondUser = e.target.secondUser.value
    const quizId = uid(20)

    if (firstUser === "" || secondUser === "" || selectedQuestions.length < 0) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all fields",
        icon: "error",
        confirmButtonText: "Okey",
      })
      return
    }

    const quizData = {
      quizId,
      firstUser,
      secondUser,
      preparedQuestions: selectedQuestions,
      oppositeStatus: false,
      premiumStatus: false,
      peerAnswers: [],
    }

    console.log(quizData)

    push(ref(db, "/quizzes/"), quizData)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Question created successfully",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        })
        router.push(`/quizfinish/${quizId}`)
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

  const selectQuestion = (e) => {
    const isQuestion = selectedQuestions.find(
      (question) => question.questionId === e.questionId
    )

    if (isQuestion) {
      const newSelectedQuestions = selectedQuestions.filter(
        (question) => question.questionId !== e.questionId
      )
      selectedQuestions = newSelectedQuestions
    } else {
      selectedQuestions.push(e)
    }

    console.log(selectedQuestions)
  }

  return (
    <>
      <Head>
        <title>Quiz Create</title>

        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto pt-28 px-2 sm:px-5">
        <div className="grid grid-cols-12 gap-y-7">
          <div className="col-span-3 px-4 py-4 relative hidden lg:flex">
            <div className="bg-gray-600 h-40 sticky top-12 w-full flex justify-center items-center text-white ">
              Reklamlar
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 px-6">
            <section className="">
              <h1 className="mb-8 sm:mb-10 xl:mb-20 font-maxbold  text-4xl sm:text-6xl xl:text-7xl text-center underline underline-offset-4 decoration-sky-500 decoration-4 ">
                {t.createQuiz.title}
              </h1>
              <p className="mb-10 font-medium text-lg text-center text-gray-500 ">
                {t.createQuiz.subtitle}
              </p>
            </section>
            <form onSubmit={createQuizHandle}>
              <section className="">
                <h2 className="mb-2 font-maxbold text-2xl sm:text-3xl text-start underline decoration-sky-500 decoration-4 ">
                  Kişisel Bilgiler
                </h2>
                <p className="mb-10 font-medium text-base text-zinc-800/80 ">
                  Bu bilgiler sadece sizin için saklanacak ve sadece sizinle
                  paylaşılacak.
                </p>

                <div className="mb-5">
                  <label
                    htmlFor="firstUser"
                    className="block mb-2 font-semibold text-xl text-zinc-800 ">
                    İsminiz
                  </label>
                  <input
                    type="text"
                    name="firstUser"
                    id="firstUser"
                    className="w-full px-3 py-3 border-2 duration-200 border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="secondUser"
                    className="block mb-2 font-semibold text-xl text-zinc-800 ">
                    Partnerinizin İsmi
                  </label>
                  <input
                    type="text"
                    name="secondUser"
                    id="secondUser"
                    className="w-full  px-3 py-3 border-2 duration-200 border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </section>
              <section className="mt-10">
                <h2 className="mb-2 font-maxbold text-2xl sm:text-3xl text-start underline decoration-sky-500 decoration-4 ">
                  Test Soru Havuzu
                </h2>
                <p className="mb-10 font-medium text-base text-zinc-800/80 ">
                  Aşağıdaki soru havuzundan sormak istediğiniz soruları seçiniz.
                </p>

                <div className="h-80 border-2 bg-slate-50 border-slate-600/50 rounded-lg p-2 overflow-auto">
                  {questions.map((question, index) => (
                    <div key={index} className="relative quizPool mb-2">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="absolute opacity-0 w-full h-full z-10 top-0"
                        onChange={() => selectQuestion(question)}
                      />

                      <label className=" flex justify-between bg-slate-200 border-[3px] border-slate-400 rounded-md py-2.5 px-4 mb-3 last:mb-0 cursor-pointer">
                        <div className="flex gap-3 items-center">
                          <span className="px-2 bg-zinc-500 text-white rounded-md inline-flex justify-center items-center w-8 h-8">
                            {index + 1}
                          </span>
                          <div>{question.question}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex justify-center">
                <button className="mt-10 px-4 py-2 border-[3px] border-teal-700 bg-teal-500 rounded-md text-xl font-semibold text-teal-800 shadow-lg shadow-teal-600/50 hover:shadow-xl hover:shadow-teal-600/60 duration-300 hover:scale-110 ">
                  Quiz Oluştur
                </button>
              </div>
            </form>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className="col-span-3 px-4 py-4 relative hidden lg:flex">
            <div className="bg-gray-600 h-40 sticky top-12 w-full flex justify-center items-center text-white ">
              Reklamlar
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default QuizCreate

export async function getServerSideProps() {
  const dbRef = await ref(db, "/questions")
  const snapshot = await get(dbRef)
  const questions = Object.values(snapshot.val())

  return {
    props: {
      questions,
    },
  }
}
