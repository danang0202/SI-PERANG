import UserLayout from '@/Layout/Layout'
import React from 'react'

const RiwayatPengajuan = ({ user }) => {
    return (
        <UserLayout isAdmin={false} session={user}>
            <div>RiawayatPengajuan</div>
        </UserLayout>
    )
}

export default RiwayatPengajuan