import { statusesData } from '@/helper/common.helper'
import { BarChart } from '@mantine/charts'
import { Group, Select, Stack, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import TextStatus from '../Commons/TextStatus'

const StackedBarChartByStatusPerYear = ({ data, selectedTahun, setSelectedTahun }) => {
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
                <Text size='sm' fw={'bold'}>Permintaan Barang per Tahun {selectedTahun} berdasarkan Status</Text>
                <Select
                    data={['2024','2025']}
                    value={selectedTahun}
                    onChange={setSelectedTahun}
                    allowDeselect={false}
                    size='xs'
                />
            </Group>
            <Stack gap={'xs'} align='center'>
                <BarChart
                    h={300}
                    data={data}
                    dataKey="month"
                    type="stacked"
                    barProps={{
                        barSize: 30, label: {
                            position: "top",
                            fill: "#000",
                            fontSize: 10,
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
                <Group wrap='wrap' align='center' justify='center' gap={'xs'}>
                    {statusesData.map((item) => (
                        <TextStatus status={item} />
                    ))}
                </Group>
            </Stack>
        </Stack>)
}

export default StackedBarChartByStatusPerYear