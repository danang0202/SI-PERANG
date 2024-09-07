import { Grid, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconCancel, IconCircleCheck, IconCircleX, IconFile, IconHourglass } from '@tabler/icons-react'
import React from 'react'


const iconData = [
    IconHourglass, IconCircleCheck, IconCircleX, IconCancel,
];


const PermintaanByStatusCard = ({ countTotal, statusCardData }) => {
    return (
        <Stack className='border  rounded-sm' p={"md"} gap={'lg'} pb={'lg'} >
            <Text size='sm' fw={'bold'}>Total Permintaan Berdasarkan Status</Text>
            <Grid gutter="xs" columns={10}>
                <Grid.Col span={2}>
                    <Group wrap="nowrap" justify="start" align="flex-start" h="100%">
                        <ThemeIcon
                            color="blueBackground"
                            c="bluePrimary"
                            size={50}
                            radius="xl"
                        >
                            <IconFile style={{ width: "60%", height: "60%" }} />
                        </ThemeIcon>
                        <Stack gap={6} h="100%">
                            <Text size="1.5rem" fw="bold" c="bluePrimary">
                                {countTotal}
                            </Text>
                            <Text size="sm" c="bluePrimary">
                                Total Permintaan
                            </Text>
                        </Stack>
                    </Group>
                </Grid.Col>
                {statusCardData.map((status, index) => (
                    <Grid.Col span={2} key={index}>
                        <Group wrap="nowrap" justify="start" align="flex-start" h="100%">
                            <ThemeIcon color={status.color} c={status.iconColor} size={50} radius="xl">
                                {React.createElement(iconData[index], { style: { width: "60%", height: "60%" } })}
                            </ThemeIcon>
                            <Stack gap={6} h="100%">
                                <Text size="1.5rem" fw="bold">
                                    {status.count}
                                </Text>
                                <Text size="sm">{status.text}</Text>
                            </Stack>
                        </Group>
                    </Grid.Col>
                ))}
            </Grid>
        </Stack>
    )
}

export default PermintaanByStatusCard