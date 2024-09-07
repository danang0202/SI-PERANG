import { statusesData } from '@/helper/common.helper'
import { BarChart } from '@mantine/charts'
import { Group, Select, Stack, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import TextStatus from '../Commons/TextStatus'
import ChartSkeletonVertical from '../Commons/ChartSkeletonVertical'


const monthOptions = [
    { value: 'all', label: 'Semua Bulan' },
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
]
const StackedBarChartByTimKerja = ({ data, selectedTahun, setSelectedTahun, loading, selectedMonth, setSelectedMonth }) => {
    const currentYear = new Date().getFullYear();
    const [years, setYears] = useState([]);

    useEffect(() => {
        const generatedYears = [];
        for (let year = currentYear; year <= 2024; year++) {
            generatedYears.push(year.toString());
        }
        setYears(generatedYears);
        setSelectedTahun(currentYear.toString())
    }, [currentYear]);

    return (
        <Stack gap={"lg"} className='border rounded-sm' p={'lg'} h={"100%"}>
            <Group align='center' justify='space-between'>
                <Text size='sm' fw={'bold'}>Status Permintaan Barang per Tim Kerja Tahun {selectedTahun}</Text>
                <Group gap={'md'}>
                    <Select
                        data={monthOptions}
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                        allowDeselect={false}
                        size='xs'
                    />
                    <Select
                        data={['2024', '2025']}
                        value={selectedTahun}
                        onChange={setSelectedTahun}
                        allowDeselect={false}
                        size='xs'
                    />
                </Group>
            </Group>
            <Stack gap={'xs'} align='center' pr={"lg"}>
                {loading ? (
                    <ChartSkeletonVertical />
                ) : (
                    <BarChart
                        h={50 * data.length}
                        data={data}
                        dataKey="tim_kerja"
                        type="stacked"
                        orientation='vertical'
                        gridAxis='y'
                        barProps={{
                            barSize: 30, label: {
                                position: "insideRight",
                                fill: "#000",
                                fontSize: 10,
                                dx: 15
                            },
                        }}
                        yAxisProps={{
                            width: 100,
                            tick: {
                                fill: "#000",
                                fontSize: 11,
                            },
                        }}
                        withTooltip
                        tooltipAnimationDuration={200}
                        series={[
                            { name: 'MENUNGGU_KONFIRMASI', color: 'gray5' },
                            { name: 'PERMINTAAN_DITOLAK', color: 'accent6' },
                            { name: 'PERMINTAAN_DITERIMA', color: 'accent5' },
                            { name: 'PERMINTAAN_DIBATALKAN', color: 'accent3' },

                        ]}
                    />
                )}
                <Group wrap='wrap' align='center' justify='center' gap={'xs'} mt={"md"}>
                    {statusesData.map((item) => (
                        <TextStatus status={item} />
                    ))}
                </Group>
            </Stack>
        </Stack>)
}

export default StackedBarChartByTimKerja