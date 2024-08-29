import UserLayout from '@/Layout/Layout'
import React from 'react'

const RiwayatPengajuan = ({ user }) => {
    return (
        <div>RiwayatPengajuan</div>


    )
}

RiwayatPengajuan.layout = page => <UserLayout children={page} session={page.props.user} title="Pengajuan" />


export default RiwayatPengajuan