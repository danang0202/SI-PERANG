import { DonutChart } from '@mantine/charts'
import { Group, Stack, Text } from '@mantine/core'
import React from 'react'
import TextStatus from '../Commons/TextStatus'
import { statusesData } from '@/helper/common.helper'
import { bulan } from '@/helper/date.helper'

const DonutStatusDokumen = ({ data }) => {
    const tahun = new Date();
    return (
        <Stack gap={"xs"} className='border rounded-sm' p={'lg'} h={'100%'} justify='space-between'>
            <Text size='sm' fw={'bold'}>Status Dokumen  per {bulan[tahun.getMonth()]}, {tahun.getFullYear()}</Text>
            <Stack gap={'xs'} align='center'>
                <DonutChart data={data}
                    labelColor='black'
                    withLabelsLine
                    withLabels
                    tooltipDataSource="segment"
                    thickness={25}
                />
                <Group wrap='wrap' align='center' justify='center' gap={'xs'}>
                    {statusesData.map((item) => (
                        <TextStatus status={item} />
                    ))}
                </Group>
            </Stack>
        </Stack>)
}

export default DonutStatusDokumen