import UserLayout from '@/Layout/Layout'
import { useMenuContext } from '@/Provider/Menu'
import { Text } from '@mantine/core'
import React, { useEffect } from 'react'

const Dashboard = ({ user }) => {
    return (
        <Text> Halaman Dashboard</Text>
    )
}

Dashboard.layout = page => <UserLayout children={page} session={page.props.user} title="Welcome" />
export default Dashboard