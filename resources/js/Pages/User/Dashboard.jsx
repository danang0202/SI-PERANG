import UserLayout from '@/Layout/Layout'
import React from 'react'

const Dashboard = ({ user }) => {
  return (
    <div>Dashboard User</div>
  )
}

Dashboard.layout = page => <UserLayout children={page} session={page.props.user} title="Dashboard" />
export default Dashboard