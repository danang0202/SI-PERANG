import ButtonWithRoute from '@/Components/Commons/ButtonWithRoute'
import SearchInput from '@/Components/Commons/SearchInput'
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout'
import UserLayout from '@/Layout/Layout'
import { useMenuContext } from '@/Provider/Menu'
import { Badge, Group, MultiSelect, Stack } from '@mantine/core'
import { IconPlus, IconSearch, IconX } from '@tabler/icons-react'
import { sortBy } from 'lodash'
import { DataTable, useDataTableColumns } from 'mantine-datatable'
import React, { useEffect, useMemo, useState } from 'react'


const PAGE_SIZES = [10, 15, 20];
const key = 'table-barang-admin';
const props = {
    resizable: true,
    sortable: true,
    draggable: true
};
const DaftarBarang = ({ barangs }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records, setRecords] = useState([sortBy(barangs, 'name').slice(0, pageSize)]);
    const [selectedJenisBarang, setSelectedJenisBarang] = useState([]);
    const [selectedSatuanBarang, setSelectedSatuanBarang] = useState([]);
    const [keyword, setKeyword] = useState('');

    const { setLoading } = useMenuContext();

    useEffect(() => {
        setLoading(false)
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
    }, [pageSize]);

    useEffect(() => {
        const filteredData = barangs.filter((barang) =>
            barang.nama.toLowerCase().includes(keyword.toLowerCase()) ||
            barang.kode.toLowerCase().includes(keyword.toLowerCase())
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
                ...props
            },
            { accessor: 'nama', ...props },
            {
                accessor: 'jenis_barang',
                render: ({ jenis_barang }) => jenis_barang ? jenis_barang.nama : 'N/A',
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
            { accessor: 'jumlah', textAlign: 'center', ...props },
            {
                accessor: 'satuan_barang',
                render: ({ satuan_barang }) => satuan_barang ? satuan_barang.nama : 'N/A',
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
            },

        ]
    });
    return (
        <>
            {/* breadcrumb */}
            <Stack gap={"md"}>
                <Group align='center' justify='space-between'>
                    <ButtonWithRoute route={'/test'} label={'Tambah Barang'} leftSection={<IconPlus size={14} />} />
                    <SearchInput keyword={keyword} setKeyword={setKeyword} />
                </Group>
                {keyword && (
                    <Group>
                        <Badge radius={"xs"} variant='light' color={'gray'} rightSection={<IconX size={14} className='cursor-pointer hover:text-red-600' onClick={() => setKeyword('')} />} >Menampilkan hasil pencarian: "{keyword}"</Badge>
                    </Group>
                )}
                <DataTable
                    height={430}
                    fz="xs"
                    withColumnBorders
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    records={records}
                    storeColumnsKey={key}
                    columns={effectiveColumns}
                    totalRecords={barangs.length}
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
        </>
    )
}


DaftarBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)
export default DaftarBarang