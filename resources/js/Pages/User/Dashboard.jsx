import UserLayout from '@/Layout/Layout'
import React from 'react'

const Dashboard = ({ user }) => {
  return (
    <UserLayout isAdmin={false} session={user}>
      <div>Dashboard User</div>
    </UserLayout>
  )
}

export default Dashboard