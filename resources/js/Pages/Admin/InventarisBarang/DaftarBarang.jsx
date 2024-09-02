import ButtonWithRoute from '@/Components/Commons/ButtonWithRoute'
import ConfirmationModal from '@/Components/Commons/ConfirmationModal'
import SearchInput from '@/Components/Commons/SearchInput'
import { EXTENDED_COLOR } from '@/constan/mantine.constan'
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper'
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout'
import UserLayout from '@/Layout/Layout'
import { useMenuContext } from '@/Provider/Menu'
import { Link } from '@inertiajs/react'
import { ActionIcon, Badge, Group, Menu, MultiSelect, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDots, IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { size, sortBy } from 'lodash'
import { DataTable, useDataTableColumns } from 'mantine-datatable'
import React, { useEffect, useMemo, useState } from 'react'
import TambahStockModal from './TambahStockModal'
import { filterBarangs } from '@/helper/table.helper'


const PAGE_SIZES = [10, 15, 20];
const key = 'table-barang-admin';
const props = {
    sortable: true,
    draggable: true,
};
const DaftarBarang = ({ barangs, status }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState([sortBy(barangs, 'name').slice(0, pageSize)]);
    const [totalRecords, setTotalRecords] = useState(barangs.length);
    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedJenisBarang, setSelectedJenisBarang] = useState([]);
    const [selectedSatuanBarang, setSelectedSatuanBarang] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const [openedModalStock, { open: openModalStock, close: closeModalStock }] = useDisclosure(false);

    const { setLoading } = useMenuContext();

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
    const jenisBarang = useMemo(() => {
        const temp = new Set(barangs.map((e) => e.jenis_barang.nama));
        return [...temp];
    }, []);

    const satuanBarang = useMemo(() => {
        const temp = new Set(barangs.map((e) => e.satuan_barang.nama));
        return [...temp];
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize, selectedJenisBarang, selectedSatuanBarang]);

    useEffect(() => {
        const filteredData = filterBarangs(barangs, keyword, selectedJenisBarang, selectedSatuanBarang);
        const sortedData = sortBy(filteredData, sortStatus.columnAccessor);
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const paginatedData = sortStatus.direction === 'desc'
            ? sortedData.reverse().slice(from, to)
            : sortedData.slice(from, to);
        setRecords(paginatedData);
        setTotalRecords(filteredData.length)
    }, [page, sortStatus, pageSize, keyword, selectedJenisBarang, selectedSatuanBarang]);

    const { effectiveColumns } = useDataTableColumns({
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
                accessor: 'jenis_barang',
                render: ({ jenis_barang }) => jenis_barang ? <Badge radius={'xs'} color='bluePrimary' variant='outline'>{jenis_barang.nama}</Badge> : 'N/A',
                ...props,
                filter: (
                    <MultiSelect
                        label="Jenis Barang"
                        description="Tampilkan seluruh data barang pada jenis terpilih"
                        data={jenisBarang}
                        value={selectedJenisBarang}
                        onChange={setSelectedJenisBarang}
                        leftSection={<IconSearch size={16} />}
                        clearable
                        searchable
                    />
                ),
                filtering: selectedJenisBarang.length > 0,
            },
            {
                accessor: 'jumlah', textAlign: 'center', ...props, width: 120,
            },
            {
                accessor: 'satuan_barang',
                render: ({ satuan_barang }) => satuan_barang ? <Badge radius={'xs'} color='secondaryPurple' variant='light'>{satuan_barang.nama}</Badge> : 'N/A',
                ...props,
                filter: (
                    <MultiSelect
                        label="Jenis Barang"
                        description="Tampilkan seluruh data barang pada jenis terpilih"
                        data={satuanBarang}
                        value={selectedSatuanBarang}
                        onChange={setSelectedSatuanBarang}
                        leftSection={<IconSearch size={16} />}
                        clearable
                        searchable
                    />
                ),
                filtering: selectedSatuanBarang.length > 0,
                width: 200
            },
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
                            <Menu.Item
                                leftSection={
                                    <IconPlus size={16} color={EXTENDED_COLOR.accent5} />
                                }
                                onClick={() => {
                                    openModalStock();
                                    setSelectedRecord(record)
                                }}
                            >
                                <Text size="sm" c={'accent5'}>Stock</Text>
                            </Menu.Item>
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
        <>
            {/* breadcrumb */}
            <Stack gap={"md"}>
                <Group align='center' justify='space-between'>
                    <ButtonWithRoute route={route('admin.inventaris-barang.create')} label={'Tambah'} leftSection={<IconPlus size={14} />} />
                    <SearchInput keyword={keyword} setKeyword={setKeyword} />
                </Group>
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
                <TambahStockModal opened={openedModalStock} close={closeModalStock} selectedRecord={selectedRecord} />
                <ConfirmationModal opened={opened} close={close} selectedRecord={selectedRecord} urlDelete={'admin.inventaris-barang.delete'} urlRevisit={'admin.inventaris-barang'} only={'barangs'} />
            </Stack>
        </>
    )
}


DaftarBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)
export default DaftarBarang