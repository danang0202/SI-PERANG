import UserLayout from '@/Layout/Layout'
import React from 'react'

const DaftarBarang = ({ user }) => {
    return (
        <UserLayout isAdmin={false} session={user}>
            <div>DaftarBarang</div>
        </UserLayout>
    )
}

export default DaftarBarang