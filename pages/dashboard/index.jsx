import Navbar from "@/components/dashboard/navbar"
import React from "react"
import DashboardLayout from "./layout"
import { db } from "@/libs/firebase"
import { ref, remove, get } from "firebase/database"

const Dashboard = ({ questionsCount, usersCount, quizzesCount }) => {
  return (
    <>
      <DashboardLayout>
        <div className="container">
          <div className="h1">
            <h1 className=" mb-2 font-semibold text-4xl">Dashboard</h1>
            <div className="flex justify-end mr-2"></div>

            <h2 className="font-medium text-xl">
              Hoş geldin, <span className="text-primary">Musa Yazlık</span>
            </h2>

            <div class="flex flex-wrap -m-4 mt-6">
              <div class="xl:w-1/3 md:w-1/2 p-4">
                <div class="border border-gray-200 p-6 rounded-lg flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4 ">
                    <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-6 h-6"
                        viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h2 class="text-2xl text-gray-900 font-bold title-font ">
                      Users
                    </h2>
                  </div>
                  <p class="leading-relaxed text-2xl font-bold ">
                    {usersCount ? usersCount : 2}
                  </p>
                </div>
              </div>
              <div class="xl:w-1/3 md:w-1/2 p-4">
                <div class="border border-gray-200 p-6 rounded-lg flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4 ">
                    <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-6 h-6"
                        viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h2 class="text-2xl text-gray-900 font-bold title-font ">
                      Quizzes
                    </h2>
                  </div>
                  <p class="leading-relaxed text-2xl font-bold ">
                    {quizzesCount ? quizzesCount : 0}
                  </p>
                </div>
              </div>
              <div class="xl:w-1/3 md:w-1/2 p-4">
                <div class="border border-gray-200 p-6 rounded-lg flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4 ">
                    <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-6 h-6"
                        viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h2 class="text-2xl text-gray-900 font-bold title-font ">
                      Questions
                    </h2>
                  </div>
                  <p class="leading-relaxed text-2xl font-bold ">
                    {questionsCount ? questionsCount : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default Dashboard

export async function getServerSideProps(context) {
  const questionsRef = await ref(db, "/questions")
  const questionsSnapshot = await get(questionsRef)
  const userRef = await ref(db, "/user")
  const userSnapshot = await get(userRef)
  const quizzesRef = await ref(db, "/quizzes")
  const quizzesSnapshot = await get(quizzesRef)

  const questionsCount = questionsSnapshot.size
  const userCount = userSnapshot.size
  const quizzesCount = quizzesSnapshot.size

  return {
    props: {
      questionsCount,
      userCount,
      quizzesCount,
    },
  }
}
