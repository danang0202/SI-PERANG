import UserLayout from '@/Layout/Layout'
import React from 'react'

const RiwayatPengajuan = ({ user }) => {
    return (
        <div>RiawayatPengajuan</div>
    )
}

RiwayatPengajuan.layout = page => <UserLayout children={page} session={page.props.user} title="Welcome" />


export default RiwayatPengajuan