import ButtonWithRoute from '@/Components/Commons/ButtonWithRoute'
import ConfirmationModalNonaktif from '@/Components/Commons/ConfirmationModalNonaktif'
import SearchInput from '@/Components/Commons/SearchInput'
import { EXTENDED_COLOR } from '@/constan/mantine.constan'
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper'
import { filterUsers } from '@/helper/table.helper'
import AdminUserManagementLayout from '@/Layout/AdminUserManagementLayout'
import UserLayout from '@/Layout/Layout'
import { useMenuContext } from '@/Provider/Menu'
import { Link } from '@inertiajs/react'
import { ActionIcon, Badge, Group, Menu, MultiSelect, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDots, IconEdit, IconForbid, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { sortBy } from 'lodash'
import { DataTable, useDataTableColumns } from 'mantine-datatable'
import React, { useEffect, useMemo, useState } from 'react'


const PAGE_SIZES = [10, 15, 20];
const key = 'table-user-admin';
const props = {
    sortable: true,
    draggable: true,
};
const UserManagement = ({ user, status, users }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState([sortBy(users, 'name').slice(0, pageSize)]);
    const [totalRecords, setTotalRecords] = useState(users.length);
    const { setLoading } = useMenuContext();
    const [keyword, setKeyword] = useState();
    const [selectedTimKerja, setSelectedTimKerja] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedRecord, setSelectedRecord] = useState();

    useEffect(() => {
        setLoading(false)
        if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        } else if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [])

    const timKerja = useMemo(() => {
        const temp = new Set();
        users.forEach((user) => {
            user.tim_kerjas.forEach((timKerja) => {
                temp.add(timKerja.nama);
            });
        });
        return [...temp];
    }, [users]);


    const [sortStatus, setSortStatus] = useState({
        columnAccessor: '',
        direction: 'asc',
    });

    useEffect(() => {
        const filteredData = filterUsers(users, keyword, selectedTimKerja);
        const sortedData = sortBy(filteredData, sortStatus.columnAccessor);
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const paginatedData = sortStatus.direction === 'desc'
            ? sortedData.reverse().slice(from, to)
            : sortedData.slice(from, to);
        setRecords(paginatedData);
        setTotalRecords(filteredData.length)
    }, [page, sortStatus, pageSize, keyword, selectedTimKerja]);

    const { effectiveColumns } = useDataTableColumns({
        // key,
        columns: [
            { accessor: 'no', width: 70, textAlign: "center", render: (row, index) => <div style={{ textAlign: 'center' }}>{index + 1}</div>, },
            { accessor: 'nama', ...props },
            { accessor: 'username', ...props },
            { accessor: 'nip', title: 'NIP', ...props, width:150},
            { accessor: 'role', ...props },
            {
                accessor: 'tim_kerjas', title: 'Tim Kerja', width:120,
                render: (row) => (
                    <Group wrap='wrap'>
                        {row.tim_kerjas && row.tim_kerjas.length > 0 ? (
                            row.tim_kerjas.map((item, index) => (
                                <Badge radius={"xs"} variant='light' color='secondaryPurple' key={index} style={{ marginRight: '5px', marginBottom: '5px' }}>
                                    {item.nama}
                                </Badge>
                            ))
                        ) : (
                            <Text className='text-gray-400'>Tidak ada tim</Text>
                        )}
                    </Group>
                ),
                filter: (
                    <MultiSelect
                        label="Tim Kerja"
                        description="Tampilkan seluruh pengguna dengan tim kerja terpilih"
                        data={timKerja}
                        value={selectedTimKerja}
                        onChange={setSelectedTimKerja}
                        leftSection={<IconSearch size={16} />}
                        clearable
                        searchable
                    />
                ),
                filtering: selectedTimKerja.length > 0,
            },
            { accessor: 'status', width:110,  render: (record) => <Badge radius={'xs'} variant='light' color={record.status == 'AKTIF' ? 'accent5' : 'accent6'}>{record.status}</Badge> },
            {
                accessor: 'action', textAlign: 'center', width: 60,
                cellsStyle: () => ({ background: 'white' }),
                titleStyle: () => ({ background: 'white' }),
                render: (record) => (
                    <Menu shadow="md" width={150} position="bottom-end" offset={-5}>
                        <Menu.Target>
                            <ActionIcon variant="transparent" color="bluePrimary">
                                <IconDots color={EXTENDED_COLOR.secondaryPurple} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Link href={route('admin.user-management.update', { id: record.id ? record.id : '' })}>
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
                                    record.status == 'AKTIF' ?
                                        (
                                            <IconForbid size={16} color={EXTENDED_COLOR.accent6} />
                                        ) : (
                                            <IconForbid size={16} color={EXTENDED_COLOR.accent5} />
                                        )

                                }
                                onClick={() => {
                                    open();
                                    setSelectedRecord(record)
                                }}
                            >
                                {record.status == 'AKTIF' ? (
                                    <Text c="accent6" size="sm">
                                        Nonaktifkan
                                    </Text>
                                ) : (
                                    <Text c="accent5" size="sm">
                                        Aktifkan
                                    </Text>
                                )}
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
                <ButtonWithRoute route={route('admin.user-management.create')} label={'Tambah'} leftSection={<IconPlus size={14} />} />
                <SearchInput keyword={keyword} setKeyword={setKeyword} />
            </Group>
            <DataTable
                pinLastColumn
                minHeight={300}
                fz="xs"
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
            <ConfirmationModalNonaktif opened={opened} close={close} selectedRecord={selectedRecord} urlPatch={'admin.user-management.status-update'} only={'users'} />
        </Stack>
    )
}

UserManagement.layout = page => (
    <UserLayout session={page.props.user} title="Pengelolaan User">
        <AdminUserManagementLayout children={page} />
    </UserLayout>
)


export default UserManagement