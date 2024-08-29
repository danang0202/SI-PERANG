import FilterButton from '@/Components/Admin/InventarisBarang/FilterButton';
import SearchInput from '@/Components/Commons/SearchInput';
import TextStatus from '@/Components/Commons/TextStatus';
import { formatTanggal } from '@/helper/date.helper';
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper';
import UserLayout from '@/Layout/Layout'
import { Link } from '@inertiajs/react';
import { Badge, Button, Group, Stack, Text } from '@mantine/core';
import { sortBy } from 'lodash';
import { DataTable, useDataTableColumns } from 'mantine-datatable';
import React, { useEffect, useState } from 'react'


const PAGE_SIZES = [10, 15, 20];
const key = 'table-perlu-tindakan-admin';
const props = {
    sortable: true,
    draggable: true
};
const PerluTindakan = ({ user, pengajuans, status }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState(pengajuans.slice(0, pageSize));
    const [keyword, setKeyword] = useState('');

    const [sortStatus, setSortStatus] = useState({
        columnAccessor: '',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        } else if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [])

    useEffect(() => {
        const filteredData = pengajuans;

        const sortedData = sortBy(filteredData, sortStatus.columnAccessor);

        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const paginatedData = sortStatus.direction === 'desc'
            ? sortedData.reverse().slice(from, to)
            : sortedData.slice(from, to);

        setRecords(paginatedData);
    }, [page, sortStatus, pageSize, keyword]);

    const { effectiveColumns, resetColumnsOrder } = useDataTableColumns({
        // key,
        columns: [
            {
                accessor: 'no',
                width: 50,
                render: (_, index) => index + 1,
                textAlign: 'center',
            },
            {
                accessor: 'created_at',
                width: 180,
                title: 'Tanggal',
                render: (row) => {
                    return formatTanggal(row.created_at);
                },
                sortable: true
            },
            {
                accessor: 'no_pengajuan',
                title: "Nomor Surat",
                render: (row) => {
                    return row.no_pengajuan ? (
                        row.no_pengajuan
                    ) : (
                        <Text size='sm' c={'gray'} fs={'italic'}>Belum ada</Text>
                    );
                }
            },
            {
                accessor: 'user.nama',
                title: "Nama Pengaju    ",
                sortable: true
            },
            {
                accessor: 'user.tim_kerja',
                title: "Tim Kerja",
                render: (row) => {
                    return (
                        // Berikan warna berbeda untuk setiap tim
                        <Badge variant='light' radius={'xs'} color='secondaryPurple'>{row.user.tim_kerja}</Badge>
                    )
                },
                sortable: true
            },
            {
                accessor: 'status',
                width: 230,
                render: ({ status }) => {
                    return (
                        <TextStatus status={status} />
                    )
                }
            },
            {
                accessor: 'action', textAlign: 'center', width: 80,
                render: (record) => (
                    <Link href={route('admin.pengajuan.perlu-tindakan.detail', { id: record.id })}>
                        <Button size='xs' variant='light'>Detail</Button>
                    </Link>
                )
            }
        ]
    });

    return (
        <Stack gap={"md"}>
            <Group align='center' justify='space-between'>
                <FilterButton />
                <SearchInput keyword={keyword} setKeyword={setKeyword} />
            </Group>
            <DataTable
                pinLastColumn
                height={450}
                fz="sm"
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                records={records}
                columns={effectiveColumns}
                totalRecords={pengajuans.length}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={(p) => setPage(p)}
                loadingText="Loading..."
                noRecordsText="Data Tidak Ditemukan"
                paginationText={({ from, to, totalRecords }) => `Menampilkan data ${from} - ${to} dari ${totalRecords}`}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={setPageSize}
            />
        </Stack>)
}

PerluTindakan.layout = page => <UserLayout children={page} session={page.props.user} title="Welcome" />

export default PerluTindakan