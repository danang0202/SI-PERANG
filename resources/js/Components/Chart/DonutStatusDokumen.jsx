import { DonutChart } from '@mantine/charts'
import { Group, Stack, Text, useMantineTheme } from '@mantine/core'
import React from 'react'
import TextStatus from '../Commons/TextStatus'
import { statusesData } from '@/helper/common.helper'
import { bulan } from '@/helper/date.helper'
import { useMediaQuery } from '@mantine/hooks'

const DonutStatusDokumen = ({ data }) => {
    const tahun = new Date();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
    return (
        <Stack className='border rounded-sm' p={'lg'} h={'100%'} justify={isMobile ? 'flex-start' : 'space-between'} gap={0}>
            <Text size='base' fw={'bold'}>Status Permintaan  per {bulan[tahun.getMonth()]}, {tahun.getFullYear()}</Text>
            <Group justify='center'>
                <DonutChart data={data}
                    labelColor='black'
                    withLabelsLine
                    withLabels
                    tooltipDataSource="segment"
                    thickness={25}
                />
            </Group>
            <Group wrap='wrap' align='center' justify='center' gap={'xs'}>
                {statusesData.map((item) => (
                    <TextStatus status={item} />
                ))}
            </Group>
        </Stack>)
}

export default DonutStatusDokumen