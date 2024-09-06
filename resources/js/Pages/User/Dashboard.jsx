import TextStatus from '@/Components/Commons/TextStatus';
import { statusesData } from '@/helper/common.helper';
import { getTodayDate } from '@/helper/date.helper';
import UserLayout from '@/Layout/Layout'
import { BarChart, DonutChart } from '@mantine/charts';
import { Avatar, Box, Grid, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconCalendar, IconCancel, IconCircleCheck, IconCircleX, IconFile, IconHourglass, IconUsersGroup } from '@tabler/icons-react'
import React from 'react'

const iconData = [
  IconHourglass, IconCircleCheck, IconCircleX, IconCancel,
];

const Dashboard = ({ userData, statusCardData, countTotal, chartData }) => {
  const chartDataDonut = statusCardData.map((status) => ({
    name: status.text,
    value: status.count,
    color: status.color,
  }));

  const todayDate = getTodayDate();

  return (
    <Stack>
      <Title order={3}>Selamat Datang!</Title>
      <Group align='center' gap={'lg'} my={'xs'} justify='space-between'>
        <Group gap={'lg'} align='center'>
          <Avatar radius="md" size={'lg'} />
          <Stack gap={0}>
            <Text fw={'bold'}>{userData.nama}</Text>
            <Text size='sm'>{userData.email}</Text>
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
        {
          userData.tim_kerjas.map((item) => (
            <Group gap={'lg'} align='center'>
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
      <Grid gutter={'lg'} columns={12} justify='center'>
        <Grid.Col span={4}>
          <Stack gap={"xs"} className='border rounded-sm' p={'lg'} h={'100%'} justify='space-between'>
            <Text size='sm' fw={'bold'}>Status Dokumen Saat Ini</Text>
            <Stack gap={'xs'} align='center'>
              <DonutChart data={chartDataDonut}
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
          </Stack>
        </Grid.Col>
        <Grid.Col span={8}>
          <Stack gap={"lg"} className='border rounded-sm' p={'lg'} h={"100%"}>
            <Text size='sm' fw={'bold'}>Permintaan Barang per Tahun 2024 berdasarkan Status</Text>
            <Stack gap={'xs'} align='center'>
              <BarChart
                h={300}
                data={chartData}
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
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}

Dashboard.layout = page => <UserLayout children={page} session={page.props.user} title="Dashboard" />
export default Dashboard