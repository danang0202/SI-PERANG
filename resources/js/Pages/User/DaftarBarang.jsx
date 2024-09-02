import UserLayout from '@/Layout/Layout'
import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Group, MultiSelect, Stack } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { DataTable, useDataTableColumns } from 'mantine-datatable'
import { sortBy } from 'lodash'
import SearchInput from '@/Components/Commons/SearchInput'
import { filterBarangs } from '@/helper/table.helper'


const PAGE_SIZES = [10, 15, 20];
const key = 'table-barang-user';
const props = {
    sortable: true,
    draggable: true
};
const DaftarBarang = ({ user, barangs }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState([sortBy(barangs, 'name').slice(0, pageSize)]);
    const [totalRecords, setTotalRecords] = useState(barangs.length);
    const [selectedJenisBarang, setSelectedJenisBarang] = useState([]);
    const [selectedSatuanBarang, setSelectedSatuanBarang] = useState([]);
    const [keyword, setKeyword] = useState('');

    const [sortStatus, setSortStatus] = useState({
        columnAccessor: '',
        direction: 'asc',
    });
    const jenisBarang = useMemo(() => {
        const temp = new Set(barangs.map((e) => e.jenis_barang.nama));
        return [...temp];p
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
            { accessor: 'jumlah', textAlign: 'center', ...props, width: 120, },
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
        ]
    });

    return (
        <Stack gap={"md"}>
            <Group align='center' justify='flex-end'>
                <SearchInput keyword={keyword} setKeyword={setKeyword} />
            </Group>
            <DataTable
                pinLastColumn
                height={500}
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
        </Stack>
    )
}
DaftarBarang.layout = page => <UserLayout children={page} session={page.props.user} title="Daftar Barang" />
export default DaftarBarang