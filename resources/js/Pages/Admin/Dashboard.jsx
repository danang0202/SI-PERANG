import UserLayout from '@/Layout/Layout'
import { useMenuContext } from '@/Provider/Menu'
import { Text } from '@mantine/core'
import React, { useEffect } from 'react'

const Dashboard = ({ user }) => {
    return (
        <UserLayout isAdmin={true} session={user}>
            <Text> Halaman Dashboard</Text>
        </UserLayout>
    )
}

export default Dashboard