import DonutStatusDokumen from '@/Components/Chart/DonutStatusDokumen';
import StackedBarChartByStatusPerYear from '@/Components/Chart/StackedBarChartByStatusPerYear';
import StackedBarChartByTimKerja from '@/Components/Chart/StackedBarChartByTimKerja';
import GreetingDashboard from '@/Components/Commons/GreetingDashboard';
import PermintaanByStatusCard from '@/Components/Commons/PermintaanByStatusCard';
import UserLayout from '@/Layout/Layout';
import { Head, router } from '@inertiajs/react';
import { Grid, Stack } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'

const Dashboard = ({ userData, statusCardData, countTotal, chartData, chartDataTimKerja }) => {
    const [selectedTahun, setSelectedTahun] = useState('');
    const [selectedTahunTimKerja, setSelectedTahunTimKerja] = useState('');
    const [selectedBulanTimKerja, setSelectedBulanTimKerja] = useState('all');
    const [loadingChartPerMonth, setLoadingChartPerMonth] = useState(false);
    const [loadingChartTimKerja, setLoadingChartTimKerja] = useState(false);
    const chartDataDonut = statusCardData.map((status) => ({
        name: status.text,
        value: status.count,
        color: status.color,
    }));

    const isFirstRender = useRef(true);
    const isTimKerjaFirstRender = useRef(true);

    const handleRouteRevisit = (tahun, tahunTimKerja, bulanTimKerja) => {
        setLoadingChartPerMonth(true);
        router.visit(route('admin.dashboard', { tahun: tahun, tahun_tim_kerja: tahunTimKerja, bulan_tim_kerja: bulanTimKerja }), {
            only: ['chartData'],
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setLoadingChartPerMonth(false)
                setLoadingChartTimKerja(false)
            }
        })
    }

    const handleRouteRevisitTimKerja = (tahun, tahunTimKerja, bulanTimKerja) => {
        setLoadingChartTimKerja(true);
        router.visit(route('admin.dashboard', { tahun: tahun, tahun_tim_kerja: tahunTimKerja, bulan_tim_kerja: bulanTimKerja }), {
            only: ['chartDataTimKerja'],
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setLoadingChartTimKerja(false);
                setLoadingChartPerMonth(false)
            }
        })
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (selectedTahun) {
            handleRouteRevisit(selectedTahun, setSelectedTahunTimKerja, selectedBulanTimKerja);
        }
    }, [selectedTahun]);

    useEffect(() => {
        if (isTimKerjaFirstRender.current) {
            isTimKerjaFirstRender.current = false;
            return;
        }

        if (selectedTahunTimKerja && selectedBulanTimKerja) {
            handleRouteRevisitTimKerja(setSelectedTahun, selectedTahunTimKerja, selectedBulanTimKerja);
        }
    }, [selectedTahunTimKerja, selectedBulanTimKerja]);

    return (<>
        <Stack mb={"lg"}>
            <Head title='Dashboard' />
            <GreetingDashboard userData={userData} />
            <PermintaanByStatusCard countTotal={countTotal} statusCardData={statusCardData} />
            <Grid gutter={'md'} columns={12} justify='center'>
                <Grid.Col span={4}>
                    <DonutStatusDokumen data={chartDataDonut} />
                </Grid.Col>
                <Grid.Col span={8}>
                    <StackedBarChartByStatusPerYear data={chartData} selectedTahun={selectedTahun} setSelectedTahun={setSelectedTahun} loading={loadingChartPerMonth} />
                </Grid.Col>
            </Grid>
            <StackedBarChartByTimKerja data={chartDataTimKerja} selectedTahun={selectedTahunTimKerja} setSelectedTahun={setSelectedTahunTimKerja} loading={loadingChartTimKerja} selectedMonth={selectedBulanTimKerja} setSelectedMonth={setSelectedBulanTimKerja} />
        </Stack>
    </>
    )
}

Dashboard.layout = page => <UserLayout children={page} session={page.props.user} title="Dashboard" />
export default Dashboard