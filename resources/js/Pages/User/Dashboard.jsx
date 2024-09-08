import DonutStatusDokumen from '@/Components/Chart/DonutStatusDokumen';
import StackedBarChartByStatusPerYear from '@/Components/Chart/StackedBarChartByStatusPerYear';
import GreetingDashboard from '@/Components/Commons/GreetingDashboard';
import PermintaanByStatusCard from '@/Components/Commons/PermintaanByStatusCard';
import UserLayout from '@/Layout/Layout'
import { Head, router } from '@inertiajs/react';
import { Grid, Stack, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useRef, useState } from 'react'

const Dashboard = ({ userData, statusCardData, countTotal, chartData }) => {
  const [selectedTahun, setSelectedTahun] = useState('');
  const [loadingChart, setLoadingChart] = useState(false);
  const chartDataDonut = statusCardData.map((status) => ({
    name: status.text,
    value: status.count,
    color: status.color,
  }));

  const isFirstRender = useRef(true);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const handleRouteRevisit = () => {
    setLoadingChart(true)
    router.visit(route('user.dashboard', { tahun: selectedTahun }), {
      only: ['chartData'],
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setLoadingChart(false)
      }
    })
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (selectedTahun) {
      handleRouteRevisit();
    }
  }, [selectedTahun]);

  return (
    <Stack>
      <Head title='Dashboard' />
      <GreetingDashboard userData={userData} />
      <PermintaanByStatusCard countTotal={countTotal} statusCardData={statusCardData} />
      <Grid gutter={'lg'} columns={12} justify='center'>
        <Grid.Col span={isMobile ? 12 : 4}>
          <DonutStatusDokumen data={chartDataDonut} />
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 8}>
          <StackedBarChartByStatusPerYear data={chartData} selectedTahun={selectedTahun} setSelectedTahun={setSelectedTahun} loading={loadingChart} />
        </Grid.Col>
      </Grid>
    </Stack>
  )
}

Dashboard.layout = page => <UserLayout children={page} session={page.props.user} title="Dashboard" />
export default Dashboard