import ButtonWithRoute from '@/Components/Commons/ButtonWithRoute'
import ConfirmationModal from '@/Components/Commons/ConfirmationModal'
import SearchInput from '@/Components/Commons/SearchInput'
import { EXTENDED_COLOR } from '@/constan/mantine.constan'
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper'
import { filterTimKerja } from '@/helper/table.helper'
import AdminUserManagementLayout from '@/Layout/AdminUserManagementLayout'
import UserLayout from '@/Layout/Layout'
import { useMenuContext } from '@/Provider/Menu'
import { Link } from '@inertiajs/react'
import { ActionIcon, Badge, Group, Menu, MultiSelect, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDots, IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { sortBy } from 'lodash'
import { DataTable, useDataTableColumns } from 'mantine-datatable'
import React, { useEffect, useState } from 'react'


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
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedTimKerja, setSelectedTimKerja] = useState([]);

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
        setPage(1)
    }, [pageSize])

    useEffect(() => {
        const filteredData = filterTimKerja(timKerjas, keyword);
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
            { accessor: 'nama_ketua', ...props, title: "Nama Ketua Tim" },
            { accessor: 'nip_ketua', ...props, title: "NIP Ketua Tim" },
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
                            <Link href={route('admin.user-management.tim-kerja.update', { id: record.id ? record.id : '' })}>
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
                                    setSelectedTimKerja(record)
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
                <ButtonWithRoute route={route('admin.user-management.tim-kerja.create')} label={'Tambah'} leftSection={<IconPlus size={14} />} />
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
            <ConfirmationModal opened={opened} close={close} selectedRecord={selectedTimKerja} urlDelete={'admin.user-management.tim-kerja.delete'} only={'timKerjas'} />
        </Stack>
    )
}

DaftarTimKerja.layout = page => (
    <UserLayout session={page.props.user} title="Pengelolaan User">
        <AdminUserManagementLayout children={page} />
    </UserLayout>
)
export default DaftarTimKerja