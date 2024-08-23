import UserLayout from '@/Layout/Layout'
import React from 'react'

const TambahPengajuan = ({ user }) => {
    return (
        <UserLayout isAdmin={false} session={user} title={'Pengajuan'}>
            <div>TambahPengajuan</div>
        </UserLayout>
    )
}

export default TambahPengajuan