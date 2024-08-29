import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute'
import ConfirmationModalPengajuan from '@/Components/Commons/ConfirmationModalPengajuan'
import TextStatus from '@/Components/Commons/TextStatus'
import { getStatusColor } from '@/helper/common.helper'
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper'
import UserLayout from '@/Layout/Layout'
import { Link, router } from '@inertiajs/react'
import { Badge, Box, Button, Grid, Group, Modal, rem, Stack, Stepper, Text, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendar, IconPrinter, IconShieldCheck, IconUserCheck } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import React, { useEffect, useState } from 'react'

const PengajuanDetail = ({ user, pengajuan, status, backUrl }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState();

    useEffect(() => {
        if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        } else if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [])

    const handleConfirm = (recordId) => {
        setLoading(true);
        if (confirmStatus) {
            const url = confirmStatus == 'accept' ? 'admin.pengajuan.accept' : confirmStatus == 'reject' ? 'admin.pengajuan.reject' : 'user.pengajuan.pembatalan';
            router.get(route(url, { id: recordId }), {
                onSuccess: () => {
                    setLoading(false);
                    close();
                    router.visit(window.location.pathname, {
                        only: ['pengajuan'],
                    });
                },
                onError: (errors) => {
                    setLoading(false);
                    console.error('Error:', errors);
                },
            });
        }
    };

    return (
        <Stack gap="md">
            <Group justify='flex-start'>
                <ButtonOutlineWithRoute label={'Kembali'} route={route(backUrl)} color={'red'} />
            </Group>
            <Grid gutter={"xl"}>
                <Grid.Col span={8}>
                    <Stack gap={'lg'}>
                        <Stack gap={"xs"}>
                            <Text size='base' fw={'bold'}>Informasi Pengajuan</Text>
                            <Grid gutter={"md"} align='center'>
                                <Grid.Col span={6}>
                                    <DateInput
                                        leftSection={<IconCalendar size={16} />}
                                        label="Tanggal Pengajuan"
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
                                        value={pengajuan.user.tim_kerja}
                                    />
                                </Grid.Col>

                            </Grid>
                        </Stack>
                        <Stack gap={'xs'}>
                            <Text size='base' fw={'bold'}>Item Pengajuan</Text>
                            <DataTable
                                mih={150}
                                fz="sm"
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
                <Grid.Col span={4}>
                    <Stack align='flex-start' gap="lg">
                        <Text fw={'bold'}>Log Status Pengajuan</Text>
                        <Stepper active={3}
                            orientation="vertical">
                            <Stepper.Step color='gray' completedIcon={<IconUserCheck style={{ width: rem(18), height: rem(18) }} />} label="Pengajuan Diajukan" description={<Stack my={'xs'} gap={'xs'} align='flex-start'>
                                <Badge variant='light' color='secondaryPurple' size="sm">Regular User</Badge>
                                <Text size='xs' ml={4}>August 29, 2024</Text>
                            </Stack>} />
                            <Stepper.Step color='accent5' completedIcon={<IconShieldCheck style={{ width: rem(18), height: rem(18) }} />} label="Pengajuan Diterima" description={<Stack my={'xs'} gap={'xs'} align='flex-start'>
                                <Badge variant='light' size="sm">Regular User</Badge>
                                <Text size='xs' ml={4}>August 29, 2024</Text>
                            </Stack>} />
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
                                    Batalkan Pengajuan
                                </Button>
                            </Group>
                        </Stack>
                    )}
                    {pengajuan.status == 'PENGAJUAN DITERIMA' && (
                        <Stack align='flex-start' gap="lg">
                            <Text fw={'bold'}>Tindakan</Text>
                            <Group justify='flex-start' gpa='lg'>
                                <a href={route('cetak-surat', { id: pengajuan.id })} target="_blank" rel="noopener noreferrer">
                                    <Button radius='xs' leftSection={<IconPrinter size={18} />} className='hover:opacity-60 transition'>
                                        Cetak Surat
                                    </Button>
                                </a>
                            </Group>
                        </Stack>
                    )}
                </Grid.Col>
            </Grid>
           <ConfirmationModalPengajuan opened={opened} close={close} selectedRecord={pengajuan} label={confirmStatus == 'accept' ? 'menerima' : confirmStatus == 'reject' ? 'menolak' : 'membatalkan'} urlPatch={confirmStatus == 'accept' ? 'admin.pengajuan.accept' : confirmStatus == 'reject' ? 'admin.pengajuan.reject' : 'user.pengajuan.pembatalan'} only='pengajuan'/>
        </Stack>
    )
}

PengajuanDetail.layout = page => <UserLayout children={page} session={page.props.user} title="Pengajuan Detail" />

export default PengajuanDetail

