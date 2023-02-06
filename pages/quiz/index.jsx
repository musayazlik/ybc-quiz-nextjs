import React from "react"
import Link from "next/link"
import { tr, en, lang } from "@/lang/langT"
import { useRouter } from "next/router"
import parse from "html-react-parser"

const Quiz = () => {
  const router = useRouter()
  const { locale } = router
  const t = lang(locale)

  const changeLanguage = (e) => {
    const locale = e.target.value
    router.push(router.pathname, router.asPath, { locale })
  }

  return (
    <div className="home w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="mb-8 sm:mb-10 xl:mb-20 font-maxbold text-4xl sm:text-6xl xl:text-7xl underline decoration-sky-500 decoration-6 ">
        {t.welcome}
      </h1>
      <p className="mb-10 px-4 font-semibold text-xl sm:text-3xl text-center flex flex-col">
        {parse(t.quizpagep)}
      </p>

      <div className="flex gap-6">
        <Link
          href={"/quizcreate"}
          className="border-4 border-violet-700 px-8 py-4 rounded-lg shadow-lg shadow-violet-300/50 font-semibold text-xl hover:scale-110 duration-200 hover:shadow-xl hover:shadow-violet-400/50 bg-violet-500  text-violet-800 ">
          {t.quizpagebutton}
        </Link>
      </div>
    </div>
  )
}

export default Quiz
