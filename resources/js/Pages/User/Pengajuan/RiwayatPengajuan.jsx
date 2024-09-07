import ConfirmationModalPengajuan from '@/Components/Commons/ConfirmationModalPengajuan';
import SearchInput from '@/Components/Commons/SearchInput';
import TextStatus from '@/Components/Commons/TextStatus';
import FilterButtonUserRiwayatPengajuan from '@/Components/User/Pengajuan/FilterButtonUserRiwayatPengajuan';
import { EXTENDED_COLOR } from '@/constan/mantine.constan';
import { statusesData } from '@/helper/common.helper';
import { formatTanggal } from '@/helper/date.helper';
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper';
import { filterDataRiwayatPengajuanUser } from '@/helper/table.helper';
import UserLayout from '@/Layout/Layout'
import { Head, Link } from '@inertiajs/react';
import { ActionIcon, Badge, Group, Menu, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconEye, IconX } from '@tabler/icons-react';
import { DataTable, useDataTableColumns } from 'mantine-datatable';
import React, { useEffect, useState } from 'react'


const PAGE_SIZES = [10, 15, 20];
const RiwayatPengajuan = ({ user, pengajuans, status }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState([pengajuans.slice(0, pageSize)]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [keyword, setKeyword] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(statusesData);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedRecord, setSelectedRecord] = useState();

    useEffect(() => {
        if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        } else if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [])

    useEffect(() => {
        setPage(1);
    }, [pageSize, selectedStatus, dateRange]);

    useEffect(() => {
        const filteredData = filterDataRiwayatPengajuanUser(pengajuans, keyword, dateRange, selectedStatus);
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const paginatedData = filteredData.slice(from, to);

        setRecords(paginatedData);
    }, [page, pageSize, keyword, selectedStatus, dateRange]);


    const { effectiveColumns } = useDataTableColumns({
        columns: [
            {
                accessor: 'id',
                width: 50,
                render: ({ id }) => <strong>{id}</strong>,
                textAlign: 'center'
            },
            {
                accessor: 'created_at',
                width: 180,
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
                accessor: 'status',
                width: 230,
                render: ({ status }) => {
                    return (
                        <TextStatus status={status} />
                    )
                }
            },
            {
                accessor: 'action', textAlign: 'center', width: 70,
                render: (record) => (
                    <Menu shadow="md" width={140} position="bottom-end" offset={-5}>
                        <Menu.Target>
                            <ActionIcon variant="transparent" color="bluePrimary">
                                <IconDots color={EXTENDED_COLOR.secondaryPurple} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Link href={route('user.pengajuan.riwayat.detail', { id: record.id ? record.id : '' })}>
                                <Menu.Item
                                    leftSection={
                                        <IconEye size={16} color={EXTENDED_COLOR.accent3} />
                                    }
                                >
                                    <Text size="sm" c={'accent3'}>Detail</Text>
                                </Menu.Item>
                            </Link>
                            {record.status == 'MENUNGGU KONFIRMASI' && (
                                <Menu.Item
                                    onClick={() => {
                                        setSelectedRecord(record);
                                        open();
                                    }}

                                    leftSection={
                                        <IconX size={16} color={EXTENDED_COLOR.secondaryPurple} />
                                    }
                                >
                                    <Text size="sm" c={'secondaryPurple'}>Pembatalan</Text>
                                </Menu.Item>
                            )}
                        </Menu.Dropdown>
                    </Menu >
                )
            }
        ]
    });

    return (
        <Stack gap={"md"}>
            <Head title='Permintaan' />
            <Group align='center' justify='space-between'>
                <FilterButtonUserRiwayatPengajuan dateRange={dateRange} setDateRange={setDateRange} setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} />
                <SearchInput keyword={keyword} setKeyword={setKeyword} />
            </Group>
            <DataTable
                pinLastColumn
                height={450}
                fz="xs"
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
            <ConfirmationModalPengajuan opened={opened} close={close} selectedRecord={selectedRecord} only={'pengajuans'} urlPatch={'user.pengajuan.pembatalan'} urlRevisit={'user.pengajuan.riwayat'} />
        </Stack>)
}
RiwayatPengajuan.layout = page => <UserLayout children={page} session={page.props.user} title="Pengajuan" />


export default RiwayatPengajuan