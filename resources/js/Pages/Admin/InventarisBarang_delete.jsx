import UserLayout from '@/Layout/Layout'
import { Link, usePage } from '@inertiajs/react'
import { Badge, Box, Group, LoadingOverlay, Stack, Tabs, useMantineTheme } from '@mantine/core'
import React, { useState } from 'react'
import DaftarBarang from '@/Pages/Admin/InventarisBarang/DaftarBarang'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import SearchInput from '@/Components/Commons/SearchInput'
import DaftarJenisBarang from '@/Components/Admin/InventarisBarang/DaftarJenisBarang'

const InventarisBarang = ({ user, barangs, jenisBarangs }) => {
    const [visible, { toggle }] = useDisclosure(false);
    const { url } = usePage();
    const [keyword, setKeyword] = useState('');
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

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
                    <Link href='/admin/inventaris-barang' onClick={toggle}>
                        <Tabs.Tab value={'barang'}>
                            Daftar Barang
                        </Tabs.Tab>
                    </Link>
                    <Link href='/admin/inventaris-barang/jenis-barang' onClick={toggle}>
                        <Tabs.Tab value="jenis">
                            Jenis Barang
                        </Tabs.Tab>
                    </Link>
                    <Link href='/admin/inventaris-barang/satuan-barang' onClick={toggle}>
                        <Tabs.Tab value="satuan">
                            Satuan Barang
                        </Tabs.Tab>
                    </Link>
                    {!isMobile && (
                        <Box pos={"absolute"} right={0} bottom={0}>
                            <SearchInput keyword={keyword} setKeyword={setKeyword} />
                        </Box>
                    )}
                </Tabs.List>
                {/*  saat mobile search letakkan di sini */}
                <Box pos="relative" mih={450}>
                    <LoadingOverlay
                        visible={visible}
                        zIndex={1000}
                        overlayProps={{ radius: 'sm', blur: 2 }}
                        loaderProps={{ color: 'pink', type: 'bars' }}
                    />
                    <Tabs.Panel value="barang" my={"md"}>
                        <DaftarBarang barangs={barangs} keyword={keyword} setKeyword={setKeyword} />
                    </Tabs.Panel>

                    <Tabs.Panel value="jenis">
                        <DaftarJenisBarang jenisBarangs={jenisBarangs} keyword={keyword} setKeyword={setKeyword} />
                    </Tabs.Panel>

                    <Tabs.Panel value="satuan">
                        Satuan tab content
                    </Tabs.Panel>
                </Box>
            </Tabs>

        </Stack>

    )
}
InventarisBarang.layout = page => <UserLayout children={page} session={page.props.user} title="Inventaris Barang" />

export default InventarisBarang
