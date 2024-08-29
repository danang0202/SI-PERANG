import { Link, usePage } from '@inertiajs/react'
import { LoadingOverlay, Stack, Tabs, useMantineTheme } from '@mantine/core'
import React from 'react'
import { useMenuContext } from '@/Provider/Menu'


const AdminInventarisBarangLayout = ({ children }) => {
    const { loading, setLoading } = useMenuContext();
    const { url } = usePage();
    let activeTab = 'barang';
    if (url.includes('jenis-barang')) {
        activeTab = 'jenis';
    } else if (url.includes('satuan-barang')) {
        activeTab = 'satuan';
    }
    return (
        <Stack pr={{ base: 0, lg: 'xl' }}>
            <Tabs value={activeTab}>
                <Tabs.List>
                    <Link href='/admin/inventaris-barang' onClick={() => setLoading(true)}>
                        <Tabs.Tab value={'barang'}>
                            Daftar Barang
                        </Tabs.Tab>
                    </Link>
                    <Link href='/admin/inventaris-barang/jenis-barang' onClick={() => setLoading(true)}>
                        <Tabs.Tab value="jenis">
                            Jenis Barang
                        </Tabs.Tab>
                    </Link>
                    <Link href='/admin/inventaris-barang/satuan-barang' onClick={() => setLoading(true)}>
                        <Tabs.Tab value="satuan">
                            Satuan Barang
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

        </Stack>)
}

export default AdminInventarisBarangLayout