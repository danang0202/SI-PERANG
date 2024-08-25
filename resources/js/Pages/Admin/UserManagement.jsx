import UserLayout from '@/Layout/Layout'
import React from 'react'

const UserManagement = ({ user }) => {
    return (
        <div>UserManagement</div>
    )
}

UserManagement.layout = page => <UserLayout children={page} session={page.props.user} title="Kelola User" />


export default UserManagement