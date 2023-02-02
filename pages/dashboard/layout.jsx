import Navbar from "@/components/dashboard/navbar"
import React from "react"

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="container">{children}</div>
    </>
  )
}

export default DashboardLayout
