import { getTodayDate } from '@/helper/date.helper';
import { Avatar, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import { IconCalendar, IconUsersGroup } from '@tabler/icons-react'
import React from 'react'

const GreetingDashboard = ({ userData }) => {
    const todayDate = getTodayDate();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
    return (
        <Stack>
            <Title order={3}>Selamat Datang!</Title>
            <Group align='center' gap={'lg'} my={'xs'} justify='space-between'>
                <Group gap={'lg'} align='center' w={isMobile ? '100%' : 'auto'}>
                    <Avatar radius="md" size='lg' />
                    <Stack gap={0}>
                        <Text fw={'bold'}>{userData.nama}</Text>
                        <Text size='sm'>{userData.username}</Text>
                    </Stack>
                </Group>
                <Group gap={'lg'} align='center' w={isMobile ? '100%' : 'auto'}> 
                    <Avatar radius="md" size={'md'}>
                        <IconCalendar />
                    </Avatar>
                    <Stack gap={0}>
                        <Title fw={'bold'} order={6}>{todayDate.dayName}</Title>
                        <Text size='sm'>{todayDate.date}</Text>
                    </Stack>
                </Group>
                <Group wrap='wrap' gap={'xl'}>
                    {
                        userData.tim_kerjas.map((item) => (
                            <Group gap={isMobile ? 'xs' : 'lg'} align='center' wrap='nowrap' w={isMobile ? '100%' : 'auto'}>
                                <Avatar radius="md" size={'md'} color='secondaryPurple'>
                                    <IconUsersGroup />
                                </Avatar>
                                <Stack gap={0}>
                                    <Title fw={'bold'} order={6}>{item.nama}</Title>
                                    <Text size='sm'>{item.nama_ketua}</Text>
                                </Stack>
                            </Group>
                        ))
                    }
                </Group>
            </Group>
        </Stack >
    )
}

export default GreetingDashboard