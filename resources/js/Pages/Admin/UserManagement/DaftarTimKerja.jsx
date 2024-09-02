import ButtonWithRoute from '@/Components/Commons/ButtonWithRoute'
import SearchInput from '@/Components/Commons/SearchInput'
import { EXTENDED_COLOR } from '@/constan/mantine.constan'
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper'
import AdminUserManagementLayout from '@/Layout/AdminUserManagementLayout'
import UserLayout from '@/Layout/Layout'
import { useMenuContext } from '@/Provider/Menu'
import { Link } from '@inertiajs/react'
import { ActionIcon, Badge, Group, Menu, MultiSelect, Stack, Text } from '@mantine/core'
import { IconDots, IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { sortBy } from 'lodash'
import { DataTable, useDataTableColumns } from 'mantine-datatable'
import React, { useEffect, useMemo, useState } from 'react'


const PAGE_SIZES = [10, 15, 20];
const key = 'table-tim-kerja-admin';
const props = {
    sortable: true,
    draggable: true,
};

const DaftarTimKerja = ({ user, status, timKerjas }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState([sortBy(timKerjas, 'name').slice(0, pageSize)]);
    const [totalRecords, setTotalRecords] = useState(timKerjas.length);
    const { setLoading } = useMenuContext();
    const [keyword, setKeyword] = useState();
    // const [selectedTimKerja, setSelectedTimKerja] = useState([]);

    useEffect(() => {
        setLoading(false)
        if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        } else if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [])

    const [sortStatus, setSortStatus] = useState({
        columnAccessor: '',
        direction: 'asc',
    });

    useEffect(() => {
        // const filteredData = filtertimKerjas(timKerjas, keyword, selectedTimKerja);
        const filteredData = timKerjas;
        const sortedData = sortBy(filteredData, sortStatus.columnAccessor);
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const paginatedData = sortStatus.direction === 'desc'
            ? sortedData.reverse().slice(from, to)
            : sortedData.slice(from, to);
        setRecords(paginatedData);
        setTotalRecords(filteredData.length)
    }, [page, sortStatus, pageSize, keyword]);

    const { effectiveColumns } = useDataTableColumns({
        // key,
        columns: [
            { accessor: 'no', width: 70, textAlign: "center", render: (row, index) => <div style={{ textAlign: 'center' }}>{index + 1}</div>, },
            { accessor: 'nama', ...props },
            // {
            //     accessor: 'tim_kerjas', title: 'Tim Kerja',
            //     render: (row) => (
            //         <Group wrap='wrap'>
            //             {row.tim_kerjas && row.tim_kerjas.length > 0 ? (
            //                 row.tim_kerjas.map((item, index) => (
            //                     <Badge radius={"xs"} variant='light' color='secondaryPurple' key={index} style={{ marginRight: '5px', marginBottom: '5px' }}>
            //                         {item.nama}
            //                     </Badge>
            //                 ))
            //             ) : (
            //                 <Text className='text-gray-400'>Tidak ada tim</Text>
            //             )}
            //         </Group>
            //     ),
            //     filter: (
            //         <MultiSelect
            //             label="Tim Kerja"
            //             description="Tampilkan seluruh pengguna dengan tim kerja terpilih"
            //             data={timKerja}
            //             value={selectedTimKerja}
            //             onChange={setSelectedTimKerja}
            //             leftSection={<IconSearch size={16} />}
            //             clearable
            //             searchable
            //         />
            //     ),
            //     filtering: selectedTimKerja.length > 0,

            // },
            {
                accessor: 'action', textAlign: 'center', width: 70,
                render: (record) => (
                    <Menu shadow="md" width={110} position="bottom-end" offset={-5}>
                        <Menu.Target>
                            <ActionIcon variant="transparent" color="bluePrimary">
                                <IconDots color={EXTENDED_COLOR.secondaryPurple} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Link href={`/admin/inventaris-barang/${record.id}/update`}>
                                <Menu.Item
                                    leftSection={
                                        <IconEdit size={16} color={EXTENDED_COLOR.accent3} />
                                    }
                                >
                                    <Text size="sm" c={'accent3'}>Edit</Text>
                                </Menu.Item>
                            </Link>
                            <Menu.Item
                                leftSection={
                                    <IconTrash size={16} color={EXTENDED_COLOR.accent6} />
                                }
                                onClick={() => {
                                    open();
                                    setSelectedRecord(record)
                                }}
                            >
                                <Text c="accent6" size="sm">
                                    Delete
                                </Text>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu >
                )
            }
        ]
    });

    return (
        <Stack gap={'md'}>
            <Group align='center' justify='space-between'>
                <ButtonWithRoute route={route('admin.inventaris-barang.create')} label={'Tambah'} leftSection={<IconPlus size={14} />} />
                <SearchInput keyword={keyword} setKeyword={setKeyword} />
            </Group>
            <DataTable
                pinLastColumn
                height={450}
                fz="sm"
                withColumnBorders
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                records={records}
                // storeColumnsKey={key}
                columns={effectiveColumns}
                totalRecords={totalRecords}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={(p) => setPage(p)}
                loadingText="Loading..."
                noRecordsText="Data Tidak Ditemukan"
                paginationText={({ from, to, totalRecords }) => `Menampilkan data ${from} - ${to} dari ${totalRecords}`}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={setPageSize}
            />



        </Stack>
    )
}

DaftarTimKerja.layout = page => (
    <UserLayout session={page.props.user} title="Pengelolaan User">
        <AdminUserManagementLayout children={page} />
    </UserLayout>
)
export default DaftarTimKerja