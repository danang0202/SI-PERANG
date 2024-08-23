import UserLayout from '@/Layout/Layout'
import React from 'react'

const UserManagement = ({ user }) => {
    return (
        <UserLayout isAdmin={true} session={user}>
            <div>UserManagement</div>
        </UserLayout>
    )
}

export default UserManagement