import UserLayout from '@/Layout/Layout'
import React from 'react'

const RiwayatPengajuan = ({ user }) => {
    return (
        <UserLayout isAdmin={true} session={user}>
            <div>RiwayatPengajuan</div>
        </UserLayout>


    )
}

export default RiwayatPengajuan