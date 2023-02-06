import React from "react"
import DashboardLayout from "../layout"
import { db, auth } from "@/libs/firebase"

const Users = () => {
  const [users, setUsers] = React.useState([])

  return (
    <>
      <DashboardLayout>
        <h1>Users</h1>
      </DashboardLayout>
    </>
  )
}

export default Users
