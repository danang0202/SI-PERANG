import UserLayout from '@/Layout/Layout'
import React from 'react'

const PerluTindakan = ({ user }) => {
    return (
        <UserLayout isAdmin={true} session={user}>
            <div>PerluTindakan</div>
        </UserLayout>
    )
}

export default PerluTindakan