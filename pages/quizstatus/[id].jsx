import React from "react"
import Head from "next/head"
import { tr, en, lang } from "@/lang/langT"
import { get, child, ref } from "firebase/database"
import { useRouter } from "next/router"
import { db } from "@/libs/firebase"

const QuizStatus = ({ questionData }) => {
  const router = useRouter()
  const { locale } = router
  const t = lang(locale)

  console.log(questionData)

  return (
    <>
      <div>
        <h1>Quiz Status</h1>

        {router.query.id}

        {questionData.oppositeStatus === false ? (
          <p>
            Henüz partneriniz hazırlamış olduğunuz soruları cevaplamamış
            durumda.
          </p>
        ) : (
          <p>Partneriniz hazırlamış olduğunuz soruları cevaplamış durumda.</p>
        )}
      </div>
    </>
  )
}

export default QuizStatus

export async function getServerSideProps(context) {
  const { id } = context.query

  const question = await get(child(ref(db), `quizzes`))
  const questionData = question.val()
  const questionId = Object.keys(questionData).find(
    (key) => questionData[key].quizId === id
  )

  return {
    props: {
      questionData: questionData[questionId],
    },
  }
}
