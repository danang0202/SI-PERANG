import UserLayout from '@/Layout/Layout'
import React from 'react'

const PerluTindakan = ({ user }) => {
    return (
        <div>PerluTindakan</div>
    )
}

PerluTindakan.layout = page => <UserLayout children={page} session={page.props.user} title="Welcome" />

export default PerluTindakan