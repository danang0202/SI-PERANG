import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute'
import ConfirmationModalPengajuan from '@/Components/Commons/ConfirmationModalPengajuan'
import { getStatusColor, toTitleCase } from '@/helper/common.helper'
import { formatDateTime } from '@/helper/date.helper'
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper'
import UserLayout from '@/Layout/Layout'
import { Head, Link } from '@inertiajs/react'
import { Badge, Box, Button, Grid, Group, rem, Stack, Stepper, Text, TextInput, useMantineTheme } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconCalendar, IconDownload, IconPrinter, IconShieldCheck, IconUserCheck } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import React, { useEffect, useState } from 'react'

const PengajuanDetail = ({ user, pengajuan, status, backUrl }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

    useEffect(() => {
        if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        } else if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [])

    return (
        <Stack gap="md" mb={'lg'}>
            <Head title='Detail Permintaan' />
            <Group justify='flex-start'>
                <ButtonOutlineWithRoute label={'Kembali'} route={route(backUrl)} color={'red'} />
            </Group>
            <Grid gutter={"xl"}>
                <Grid.Col span={isMobile ? 12 : 8}>
                    <Stack gap={'lg'}>
                        <Stack gap={"xs"}>
                            <Text size='base' fw={'bold'}>Informasi Permintaan</Text>
                            <Grid gutter={"md"} align='center'>
                                <Grid.Col span={6}>
                                    <DateInput
                                        leftSection={<IconCalendar size={16} />}
                                        label="Tanggal Permintaan"
                                        radius={"xs"}
                                        size='sm'
                                        readOnly
                                        value={new Date(pengajuan.created_at)}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        readOnly
                                        label="Status"
                                        radius={"xs"}
                                        size='sm'
                                        leftSection={<Box w={12} h={12} bg={getStatusColor(pengajuan.status)}></Box>}
                                        value={pengajuan.status}
                                    />
                                </Grid.Col>
                            </Grid>
                            <TextInput
                                readOnly
                                label="Nomor Surat"
                                radius={"xs"}
                                size='sm'
                                value={pengajuan.no_pengajuan || 'Belum ada'}
                            />
                            <Grid gutter={"md"}>
                                <Grid.Col span={8}>
                                    <TextInput
                                        readOnly
                                        label="Nama Pegawai"
                                        radius={"xs"}
                                        size='sm'
                                        value={pengajuan.user.nama}
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput
                                        readOnly
                                        label="Tim Kerja"
                                        radius={"xs"}
                                        size='sm'
                                        value={pengajuan.tim_kerja.nama}
                                    />
                                </Grid.Col>

                            </Grid>
                        </Stack>
                        <Stack gap={'xs'}>
                            <Text size='base' fw={'bold'}>Item Permintaan</Text>
                            <DataTable
                                mih={150}
                                fz="xs"
                                withColumnBorders
                                records={pengajuan.items}
                                columns={[
                                    {
                                        accessor: 'no',
                                        width: 50,
                                        render: (_, index) => <strong>{index + 1}</strong>,
                                        textAlign: 'center'
                                    },
                                    {
                                        accessor: 'barang',
                                        render: ({ barang }) => barang ? barang.nama : '',
                                        title: <div style={{ textAlign: 'center' }}>Barang</div>,
                                    },
                                    {
                                        accessor: 'jumlah',
                                        width: 75,
                                        textAlign: 'center'
                                    },
                                    {
                                        accessor: 'satuan',
                                        textAlign: 'center',
                                        render: ({ barang }) => barang ? barang.satuan_barang.nama : 'N/A',
                                    },
                                    {
                                        accessor: 'keterangan',
                                        title: <div style={{ textAlign: 'center' }}>Keterangan</div>,

                                    },
                                ]}
                                totalRecords={pengajuan.items.length}
                                loadingText="Loading..."
                                noRecordsText="Data Tidak Ditemukan"
                            />

                        </Stack>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={isMobile ? 12 : 4}>
                    <Stack align='flex-start' gap="lg">
                        <Text fw={'bold'}>Log Status Permintaan</Text>
                        <Stepper active={3}
                            orientation="vertical">
                            <Stepper.Step color='gray' completedIcon={<IconUserCheck style={{ width: rem(18), height: rem(18) }} />} label="Permintaan Diajukan" description={<Stack my={'xs'} gap={'xs'} align='flex-start'>
                                <Badge variant='light' color='bluePrimary' size="sm">{pengajuan.user.nama}</Badge>
                                <Text size='xs' ml={4}>{formatDateTime(pengajuan.created_at)}</Text>
                            </Stack>} />
                            {pengajuan.status != 'MENUNGGU KONFIRMASI' && (
                                <Stepper.Step color={getStatusColor(pengajuan.status)} completedIcon={<IconShieldCheck style={{ width: rem(18), height: rem(18) }} />} label={toTitleCase(pengajuan.status)} description={<Stack my={'xs'} gap={'xs'} align='flex-start'>
                                    <Badge variant='light' size="sm">{pengajuan.status == 'PERMINTAAN DIBATALKAN' ? pengajuan.user.nama : 'Admin'}</Badge>
                                    <Text size='xs' ml={4}>{formatDateTime(pengajuan.updated_at)}</Text>
                                </Stack>} />
                            )}
                        </Stepper>
                    </Stack>
                    {user.role == 'ADMIN' && pengajuan.status == 'MENUNGGU KONFIRMASI' && (
                        <Stack align='flex-start' gap="lg">
                            <Text fw={'bold'}>Tindakan</Text>
                            <Group justify='flex-start' gpa='lg'>
                                <Button radius='xs' color='red' onClick={() => { setConfirmStatus('reject'); open() }}>
                                    Tolak
                                </Button>
                                <Button radius='xs' onClick={() => { setConfirmStatus('accept'); open() }}>
                                    Terima
                                </Button>
                            </Group>
                        </Stack>
                    )}
                    {user.role == 'USER' && pengajuan.status == 'MENUNGGU KONFIRMASI' && (
                        <Stack align='flex-start' gap="lg">
                            <Text fw={'bold'}>Tindakan</Text>
                            <Group justify='flex-start' gpa='lg'>
                                <Button radius='xs' color='red' variant='outline' onClick={() => { setConfirmStatus('cencel'); open() }}>
                                    Batalkan Permintaan
                                </Button>
                            </Group>
                        </Stack>
                    )}
                    {pengajuan.status == 'PERMINTAAN DITERIMA' && (
                        <Stack align='flex-start' gap="lg">
                            <Text fw={'bold'}>Tindakan</Text>
                            <Group justify='flex-start' gpa='lg'>
                                <a href={route('cetak-surat', { id: pengajuan.id })} target="_blank" rel="noopener noreferrer">
                                    <Button radius='xs' leftSection={<IconPrinter size={18} />} className='hover:opacity-60 transition'>
                                        Cetak Surat
                                    </Button>
                                </a>
                                <a href={route('download-surat', { id: pengajuan.id })}>
                                    <Button radius='xs' color='secondaryPurple' leftSection={<IconDownload size={18} />} className='hover:opacity-60 transition'>
                                        Download Surat
                                    </Button>
                                </a>
                            </Group>
                        </Stack>
                    )}
                </Grid.Col>
            </Grid>
            <ConfirmationModalPengajuan opened={opened} close={close} selectedRecord={pengajuan} label={confirmStatus == 'accept' ? 'menerima' : confirmStatus == 'reject' ? 'menolak' : 'membatalkan'} urlPatch={confirmStatus == 'accept' ? 'admin.pengajuan.accept' : confirmStatus == 'reject' ? 'admin.pengajuan.reject' : 'user.pengajuan.pembatalan'} only='pengajuan' />
        </Stack>
    )
}

PengajuanDetail.layout = page => <UserLayout children={page} session={page.props.user} title="Pengajuan Detail" />

export default PengajuanDetail

