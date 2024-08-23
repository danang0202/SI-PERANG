import UserLayout from '@/Layout/Layout'
import React from 'react'

const InventarisBarang = ({ user }) => {
    return (
        <UserLayout isAdmin={true} session={user}>
            <div>InventarisBarang</div>
        </UserLayout>
    )
}

export default InventarisBarang