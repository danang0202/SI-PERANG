import { getTodayDate } from '@/helper/date.helper';
import UserLayout from '@/Layout/Layout'
import { Avatar, Grid, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconCalendar, IconCancel, IconCircleCheck, IconCircleX, IconFile, IconHourglass } from '@tabler/icons-react'
import React from 'react'

const iconData = [
  IconHourglass, IconCircleCheck, IconCircleX, IconCancel,
];

const Dashboard = ({ user, statusCardData }) => {
  const todayDate = getTodayDate();
  return (
    <Stack>
      <Title order={3}>Selamat Datang!</Title>
      <Group align='center' gap={'lg'} my={'md'} justify='space-between'>
        <Group gap={'lg'} align='center'>
          <Avatar radius="md" size={'lg'} />
          <Stack gap={0}>
            <Text fw={'bold'}>{user.nama}</Text>
            <Text size='sm'>{user.email}</Text>
          </Stack>
        </Group>
        <Group gap={'lg'} align='center'>
          <Avatar radius="md" size={'md'}>
            <IconCalendar />
          </Avatar>
          <Stack gap={0}>
            <Title fw={'bold'} order={6}>{todayDate.dayName}</Title>
            <Text size='sm'>{todayDate.date}</Text>
          </Stack>
        </Group>
        <Group gap={'lg'} align='center'>
          <Avatar radius="md" size={'md'}>
            <IconCalendar />
          </Avatar>
          <Stack gap={0}>
            <Title fw={'bold'} order={6}>{todayDate.dayName}</Title>
            <Text size='sm'>{todayDate.date}</Text>
          </Stack>
        </Group>
      </Group>

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
                  12
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
    </Stack>
  )
}

Dashboard.layout = page => <UserLayout children={page} session={page.props.user} title="Dashboard" />
export default Dashboard