import ButtonWithRoute from '@/Components/Commons/ButtonWithRoute';
import ConfirmationModal from '@/Components/Commons/ConfirmationModal';
import SearchInput from '@/Components/Commons/SearchInput';
import { EXTENDED_COLOR } from '@/constan/mantine.constan';
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper';
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout';
import UserLayout from '@/Layout/Layout';
import { useMenuContext } from '@/Provider/Menu';
import { Link } from '@inertiajs/react';
import { ActionIcon, Badge, Group, Menu, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconEdit, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { sortBy } from 'lodash';
import { DataTable, useDataTableColumns } from 'mantine-datatable';
import React, { useEffect, useState } from 'react'


const PAGE_SIZES = [10, 15, 20];
const key = 'table-jenis-barang-admin';
const props = {
    // resizable: true,
    sortable: true,
    draggable: true
};

const DaftarJenisBarang = ({ jenisBarangs, status }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState([jenisBarangs.slice(0, pageSize)]);
    const [selectedRecord, setSelectedRecord] = useState();
    const [keyword, setKeyword] = useState('');
    const { setLoading } = useMenuContext();
    const [opened, { open, close }] = useDisclosure(false);
    const [sortStatus, setSortStatus] = useState({
        columnAccessor: '',
        direction: 'asc',
    });

    useEffect(() => {
        setLoading(false)
        if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        } else if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [])
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const filteredData = jenisBarangs.filter((item) =>
            item.nama.toLowerCase().includes(keyword.toLowerCase())
        );
        const sortedData = sortBy(filteredData, sortStatus.columnAccessor);
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const paginatedData = sortStatus.direction === 'desc'
            ? sortedData.reverse().slice(from, to)
            : sortedData.slice(from, to);
        setRecords(paginatedData);
    }, [page, sortStatus, pageSize, keyword]);


    const { effectiveColumns, resetColumnsOrder, resetColumnsWidth } = useDataTableColumns({
        key,
        columns: [
            {
                accessor: 'kode',
                render: ({ kode }) => <strong>{kode}</strong>,
                ...props,
                width: 100,
                textAlign: 'center'
            },
            { accessor: 'nama', ...props },
            {
                accessor: 'action', textAlign: 'center',
                width: 70,
                render: (record) => (
                    <Menu shadow="md" width={110} position="bottom-end" offset={-5}>
                        <Menu.Target>
                            <ActionIcon variant="transparent" color="secondaryPurple">
                                <IconDots />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Link href={`/admin/inventaris-barang/jenis-barang/${record.id}/update`}>
                                <Menu.Item
                                    leftSection={
                                        <IconEdit size={16} color={EXTENDED_COLOR.accent5} />
                                    }
                                >
                                    <Text size="sm">Edit</Text>
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
        <Stack gap={"md"}>
            <Group align='center' justify='space-between'>
                <ButtonWithRoute route={route('admin.inventaris-barang.jenis.create')} label={'Tambah'} leftSection={<IconPlus size={14} />} />
                <SearchInput keyword={keyword} setKeyword={setKeyword} />
            </Group>
            {keyword && (
                <Group>
                    <Badge radius={"xs"} variant='light' color={'gray'} rightSection={<IconX size={14} className='cursor-pointer hover:text-red-600' onClick={() => setKeyword('')} />} >Menampilkan hasil pencarian: "{keyword}"</Badge>
                </Group>
            )}
            <DataTable
            pinLastColumn
                height={450}
                fz="xs"
                withColumnBorders
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                records={records}
                storeColumnsKey={key}
                columns={effectiveColumns}
                totalRecords={jenisBarangs.length}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={(p) => setPage(p)}
                loadingText="Loading..."
                noRecordsText="Data Tidak Ditemukan"
                paginationText={({ from, to, totalRecords }) => `Menampilkan data ${from} - ${to} dari ${totalRecords}`}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={setPageSize}
            />
            <ConfirmationModal opened={opened} close={close} selectedRecord={selectedRecord} urlDelete={'admin.inventaris-barang.jenis.delete'} urlRevisit={'admin.inventaris-barang.jenis'} only={'jenisBarangs'} />
        </Stack>)
}

DaftarJenisBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)
export default DaftarJenisBarang