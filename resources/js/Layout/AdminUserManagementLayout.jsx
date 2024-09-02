import { Head, Link, usePage } from '@inertiajs/react'
import { LoadingOverlay, Stack, Tabs, useMantineTheme } from '@mantine/core'
import React from 'react'
import { useMenuContext } from '@/Provider/Menu'


const AdminUserManagementLayout = ({ children }) => {
    const { loading, setLoading } = useMenuContext();
    const { url } = usePage();
    let activeTab = 'user-management';
    if (url.includes('tim-kerja')) {
        activeTab = 'tim-kerja';
    }

    return (
        <>
            <Head title="User Management" />
            <Stack pr={{ base: 0, lg: 'xl' }}>
                <Tabs value={activeTab}>
                    <Tabs.List>
                        <Link href={route('admin.user-management')} onClick={() => setLoading(true)}>
                            <Tabs.Tab value={'user-management'}>
                                User
                            </Tabs.Tab>
                        </Link>
                        <Link href={route('admin.user-management.tim-kerja')} onClick={() => setLoading(true)}>
                            <Tabs.Tab value="tim-kerja">
                                Tim Kerja
                            </Tabs.Tab>
                        </Link>
                    </Tabs.List>
                    <Stack pos="relative" mih={450} my={"md"}>
                        <LoadingOverlay
                            visible={loading}
                            zIndex={1000}
                            overlayProps={{ radius: 'sm', blur: 2 }}
                            loaderProps={{ color: 'pink', type: 'bars' }}
                        />
                        {children}
                    </Stack>
                </Tabs>

            </Stack>
        </>
    )
}

export default AdminUserManagementLayout