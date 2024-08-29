import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute'
import UserLayout from '@/Layout/Layout'
import { Badge, Button, Grid, Group, rem, Stack, Stepper, Text, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconCalendar, IconShieldCheck, IconUserCheck } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import React from 'react'

const PengajuanDetail = ({ user, pengajuan }) => {
    console.log(pengajuan);
    return (
        <Stack gap="md">
            <Group justify='flex-start'>
                <ButtonOutlineWithRoute label={'Kembali'} route={'/test'} color={'red'} />
            </Group>
            <Grid gutter={"xl"}>
                <Grid.Col span={8}>
                    <Stack gap={'lg'}>
                        <Stack gap={"xs"}>
                            <Text size='base' fw={'bold'}>Informasi Pengajuan</Text>
                            <DateInput
                                leftSection={<IconCalendar size={16} />}
                                label="Tanggal Pengajuan"
                                radius={"xs"}
                                size='sm'
                                readOnly
                                value={new Date(pengajuan.created_at)}
                            />
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
                                <Badge variant='light' size="sm">Regular User</Badge>
                                <Text size='xs' ml={4}>August 29, 2024</Text>
                            </Stack>} />
                            <Stepper.Step color='accent5' completedIcon={<IconShieldCheck style={{ width: rem(18), height: rem(18) }} />} label="Pengajuan Diterima" description={<Stack my={'xs'} gap={'xs'} align='flex-start'>
                                <Badge variant='light' size="sm">Regular User</Badge>
                                <Text size='xs' ml={4}>August 29, 2024</Text>
                            </Stack>} />
                        </Stepper>
                    </Stack>
                    {user.role == 'ADMIN' && (
                        <Stack align='flex-start' gap="lg">
                            <Text fw={'bold'}>Tindakan</Text>
                            <Group justify='flex-start' gpa='lg'>
                                <Button radius='xs' color='red'>
                                    Tolak
                                </Button>
                                <Button radius='xs'>
                                    Terima
                                </Button>
                            </Group>
                        </Stack>
                    )}
                </Grid.Col>
            </Grid>
        </Stack>
    )
}

PengajuanDetail.layout = page => <UserLayout children={page} session={page.props.user} title="Pengajuan Detail" />

export default PengajuanDetail