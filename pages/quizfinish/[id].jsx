import React from "react"
import Head from "next/head"
import { lang } from "@/lang/langT"
import { useRouter } from "next/router"

import Swal from "sweetalert2"
import { IoIosWarning } from "react-icons/io"
const QuizCreate = () => {
  const router = useRouter()
  const { locale } = router
  const t = lang(locale)

  const urlCopy = (text) => {
    navigator.clipboard.writeText(text)
    Swal.fire({
      title: t.quizFinish.copySuccess,
      text: t.quizFinish.copySuccessText,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return (
    <>
      <Head>
        <title>{t.quizFinish.title}</title>
        <meta name="description" content={t.quizFinish.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto pt-28 px-5">
        <div className="grid grid-cols-12 gap-y-7">
          <div className="col-span-3 px-4 py-4 relative hidden lg:flex">
            <div className="bg-gray-600 h-40 sticky top-12 w-full flex justify-center items-center text-white  ">
              {t.ads}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 px-3 sm:px-6 mb-10">
            <section className="">
              <h1 className="mb-10 font-maxbold text-4xl sm:text-5xl text-center underline underline-offset-4 decoration-sky-500 decoration-4 ">
                {t.quizFinish.title}
              </h1>
              <p className="mb-10 font-medium text-lg text-center text-gray-500 ">
                {t.quizFinish.subtitle}
              </p>
              <p className="mb-10 font-medium text-lg text-center text-gray-400 bg-gray-200 border-2 border-gray-500/60 shadow-md rounded-sm py-2 overflow-auto px-8 ">
                {`${process.env.NEXT_PUBLIC_APP_URL}/quizsolve?id=${router.query.id}`}
              </p>

              <div className="flex justify-center">
                <button
                  className="px-4 py-2 border-[3px] border-blue-800 bg-blue-600 text-blue-800 shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600/50 duration-300 hover:scale-110 rounded-sm font-semibold text-xl"
                  onClick={() =>
                    urlCopy(
                      `${process.env.NEXT_PUBLIC_APP_URL}/quizsolve?id=${router.query.id}`
                    )
                  }>
                  {t.quizFinish.copy}
                </button>
              </div>

              <div className="flex flex-col justify-center items-start mt-10">
                <p className="mb-10 font-medium text-lg text-center text-gray-500 flex flex-col ">
                  <span className="bg-yellow-300 text-yellow-600 px-4 py-2 rounded-sm flex  justify-between mb-2 items-center font-semibold">
                    <IoIosWarning fontSize={26} /> {t.quizFinish.textWarning}
                    <IoIosWarning fontSize={26} />
                  </span>
                  <span>{t.quizFinish.subtitle2}</span>
                </p>
                <p className="mb-10 w-full font-medium text-lg text-center text-gray-400 bg-gray-200 border-2 border-gray-500/60 shadow-md rounded-sm py-2 px-8 overflow-auto ">
                  {router.query.id}
                </p>
                <div className=" flex justify-center w-full">
                  <button
                    className=" mb-10 inline-block w-auto px-4 py-2 border-[3px] border-blue-800 bg-blue-600 text-blue-800 shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600/50 duration-300 hover:scale-110 rounded-sm font-semibold text-xl"
                    onClick={() => urlCopy(`${router.query.id}`)}>
                    {t.quizFinish.copy}
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="col-span-3 px-4 py-4 relative hidden lg:flex">
            <div className="bg-gray-600 h-40 sticky top-12 w-full flex justify-center items-center text-white  ">
              {t.ads}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default QuizCreate
