import FilterButtonRiwayatPengajuan from '@/Components/Admin/InventarisBarang/RiwayatPengajuan/FilterButtonRiwayatPengajuan';
import SearchInput from '@/Components/Commons/SearchInput';
import TextStatus from '@/Components/Commons/TextStatus';
import { statusesData, timKerjaData } from '@/helper/common.helper';
import { formatTanggal } from '@/helper/date.helper';
import UserLayout from '@/Layout/Layout'
import { Head, Link, router } from '@inertiajs/react';
import { Badge, Button, Group, Pagination, Stack, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { DataTable, useDataTableColumns } from 'mantine-datatable';
import React, { useEffect, useRef, useState } from 'react'


const key = 'table-perlu-tindakan-admin';
const pageSize = 15;
const PerluTindakan = ({ user, paginatedPengajuans, timKerja, filters }) => {
    const [page, setPage] = useState(paginatedPengajuans.current_page);
    const [records, setRecords] = useState(paginatedPengajuans.data);
    const [keyword, setKeyword] = useState(filters.keyword);
    const [debouncedKeyword] = useDebouncedValue(keyword, 300);
    const [localDateRange, setLocalDateRange] = useState(() => {
        return filters.dateRange.map(date => new Date(date));
    });
    const [localSelectedStatus, setLocalSelectedStatus] = useState(filters.statuses.length != 0 ? filters.statuses : statusesData);
    const [localSelectedTimKerja, setLocalSelectedTimKerja] = useState(filters.timKerjas.length != 0 ? filters.timKerjas : timKerja);
    useEffect(() => {
        const filteredData = paginatedPengajuans.data;
        setRecords(filteredData);
    }, [page, keyword]);

    const { effectiveColumns } = useDataTableColumns({
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
            },
            {
                accessor: 'no_pengajuan',
                title: "Nomor Surat",
                render: (row) => {
                    return row.no_pengajuan ? (
                        <Badge radius="xs" variant="outline">{row.no_pengajuan}</Badge>
                    ) : (
                        <Text size='sm' c={'gray'} fs={'italic'}>Belum ada</Text>
                    );
                }
            },
            {
                accessor: 'user.nama',
                title: "Nama",
            },
            {
                accessor: 'tim_kerja.nama',
                title: "Tim Kerja",
                render: (row) => {
                    return (
                        <Badge variant='light' radius={'xs'} color='secondaryPurple'>{row.tim_kerja.nama}</Badge>
                    )
                },
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

    const isFirstRender = useRef(true);

    const handleRouteVisit = () => {
        router.visit(route('admin.pengajuan.perlu-tindakan', { page, dateRange: localDateRange, statuses: localSelectedStatus, keyword: debouncedKeyword, timKerjas: localSelectedTimKerja }), {
            only: ['paginatedPengajuans', 'filters'],
            preserveScroll: true,
        });
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (page) {
            handleRouteVisit();
        }
    }, [page, debouncedKeyword]);

    return (
        <Stack gap={"md"}>
            <Head title="Permintaan" />
            <Group align='center' justify='space-between'>
                <FilterButtonRiwayatPengajuan localDateRange={localDateRange} setLocalDateRange={setLocalDateRange} localSelectedStatus={localSelectedStatus} setLocalSelectedStatus={setLocalSelectedStatus} localSelectedTimKerja={localSelectedTimKerja} setLocalSelectedTimKerja={setLocalSelectedTimKerja} setPage={setPage} handleRouteVisit={handleRouteVisit} timKerja={timKerja} />
                <SearchInput keyword={keyword} setKeyword={setKeyword} />
            </Group>
            <DataTable
                pinLastColumn
                height={450}
                fz="sm"
                records={records}
                columns={effectiveColumns}
                totalRecords={paginatedPengajuans.last_page}
                loadingText="Loading..."
                noRecordsText="Data Tidak Ditemukan"
            />
            <Group justify='space-between' ml={"xs"} align='center'>
                <Text size='sm'>Menampilkan {(page - 1) * pageSize + 1} - {Math.min(((page - 1) * pageSize + 1) + pageSize - 1, paginatedPengajuans.total)} data dari {paginatedPengajuans.total}</Text>
                <Pagination value={page} onChange={setPage} total={paginatedPengajuans.last_page} size={'sm'} />
            </Group>
        </Stack>
    )
}

PerluTindakan.layout = page => <UserLayout children={page} session={page.props.user} title="Permintaan" />

export default PerluTindakan