import { EXTENDED_COLOR } from '@/constan/mantine.constan';
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper';
import UserLayout from '@/Layout/Layout'
import { itemPengajuanSchema, pengajuanSchema } from '@/Schema/Pengajuan.schema';
import { Head, router } from '@inertiajs/react';
import { ActionIcon, Button, Grid, Group, Menu, NumberInput, Select, Stack, Text, Textarea, TextInput, useMantineTheme } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconCalendar, IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { sortBy } from 'lodash';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react'

const TambahPengajuan = ({ user, barangs, satuanBarangs, userProfile, status }) => {
    const [loading, setLoading] = useState();
    const [satuanBarang, setSatuanBarang] = useState('');
    const [itemPengajuan, setItemPengajuan] = useState([]);
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

    useEffect(() => {
        if (status && status.type == 'fail') {
            showFailNotification(status.message)
        } else if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        }
    }, [status])

    const barangOptions = barangs.filter((item) => item.jumlah > 0).map(item => ({
        value: item.id.toString(),
        label: item.nama,
        stock: item.jumlah
    }));

    const timKerjaOptions = userProfile.tim_kerjas.map(item => ({
        value: item.id.toString(),
        label: item.nama,
    }));


    const formPengajuan = useForm({
        mode: 'uncontrolled',
        initialValues: {
            valueFormat: 'DD MM YYYY',
            tanggalPengajuan: new Date(),
            namaPengaju: user.nama,
            timKerjaId: '',
            itemPengajuan: []
        },
        validate: zodResolver(pengajuanSchema),
    });

    const formItemPengajuan = useForm({
        mode: 'controlled',
        initialValues: {
            barangId: '',
            jumlah: 0,
            keterangan: '',
        },
        validate: zodResolver(itemPengajuanSchema),
    });

    useEffect(() => {
        formPengajuan.setFieldValue('itemPengajuan', itemPengajuan);
    }, [itemPengajuan]);

    useEffect(() => {
        const selectedBarang = barangs.find((barang) => barang.id.toString() === formItemPengajuan.values.barangId);
        if (selectedBarang) {
            setSatuanBarang(satuanBarangs.find((satuanBarang) => satuanBarang.id === selectedBarang.satuan_id).nama);
        } else {
            setSatuanBarang('');
        }
    }, [formItemPengajuan.values.barangId, barangOptions]);


    const handleEdit = (record) => {
        formItemPengajuan.setValues({
            barangId: record.barangId,
            jumlah: record.jumlah,
            keterangan: record.keterangan,
        });
    };

    const handleDeleteItemPengajuan = (barangId) => {
        setItemPengajuan((prevItems) =>
            prevItems.filter((item) => item.barangId !== barangId)
        );
    };


    const handleSubmitFormItemPengajuan = (values) => {
        values.barang = barangs.find((item) => item.id == values.barangId)
        if (values.jumlah > values.barang.jumlah) {
            formItemPengajuan.setFieldError('jumlah', 'Jumlah tidak boleh melebihi stok');
            return;
        }
        setItemPengajuan((prevItems = []) => {
            let updatedItems = [...prevItems];
            let foundIndex = updatedItems.findIndex(item => item.barangId === values.barangId);
            if (foundIndex !== -1) {
                updatedItems[foundIndex] = values;
            } else {
                updatedItems.push(values);
            }
            return updatedItems;
        });
        formItemPengajuan.reset();
    };

    const handleSubmitPengajuan = (values) => {
        setLoading(true)
        router.post(route('user.pengajuan.tambah.action'), values, {
            onSuccess: () => {
                formItemPengajuan.reset();
                formPengajuan.reset();
                setItemPengajuan([]);
                setLoading(false);
            },
        });
    };

    return (
        <Stack gap={"lg"} mb={"xl"}>
            <Head title='Permintaan' />
            <form onSubmit={formPengajuan.onSubmit((values) => handleSubmitPengajuan(values))}>
                <Stack>
                    <Group justify='space-between' align='center'>
                        <Text size='sm'>Menambahkan Permintaan Barang</Text>
                        <Button loading={loading} radius={'xs'} className='hover:opacity-60 transition duration-200' type='submit' disabled={itemPengajuan.length == 0}>
                            Simpan
                        </Button>
                    </Group>
                    {/* Form awal */}
                    <Stack gap={'xs'}>
                        <Text size='base' fw={'bold'}>Informasi Permintaan</Text>
                        <Grid gutter={'lg'}>
                            <Grid.Col span={isMobile ? 12 : 4}>
                                <DateInput
                                    withAsterisk
                                    leftSection={<IconCalendar size={16} />}
                                    label="Tanggal Permintaan"
                                    placeholder="Pilih tanggal..."
                                    radius={"xs"}
                                    size='sm'
                                    readOnly
                                    {...formPengajuan.getInputProps('tanggalPengajuan')}
                                    variant='filled'
                                />
                            </Grid.Col>
                            <Grid.Col span={isMobile ? 12 : 4}>
                                <TextInput
                                    readOnly
                                    label="Nama Pegawai"
                                    placeholder="Nama pengaju..."
                                    radius={"xs"}
                                    size='sm'
                                    withAsterisk variant='filled'
                                    value={user.nama}
                                />
                            </Grid.Col>
                            <Grid.Col span={isMobile ? 12 : 4}>
                                <Select
                                    withAsterisk
                                    label="Tim Kerja"
                                    placeholder="Pilih tim  kerja..."
                                    data={timKerjaOptions}
                                    radius={'xs'}
                                    key={formPengajuan.key('timKerjaId')}
                                    {...formPengajuan.getInputProps('timKerjaId')}
                                />
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Stack>
            </form >

            <form onSubmit={formItemPengajuan.onSubmit((values) => handleSubmitFormItemPengajuan(values))}>
                <Stack gap={'xs'}>
                    <Text size='base' fw={'bold'}>Item Permintaan</Text>
                    <Grid>
                        <Grid.Col span={isMobile ? 12 : 6}>
                            <Stack gap={"md"}>
                                <Select
                                    withAsterisk
                                    label="Barang"
                                    placeholder="Pilih barang..."
                                    data={sortBy(barangOptions, 'label')}
                                    searchable
                                    nothingFoundMessage="Nothing found..."
                                    radius={'xs'}
                                    key={formItemPengajuan.key('barangId')}
                                    {...formItemPengajuan.getInputProps('barangId')}
                                    renderOption={({ option }) => (
                                        <Text size='sm'>{option.label} <span className='text-gray-400'> - stock: [{option.stock}] </span></Text>
                                    )}
                                />
                                <Grid>
                                    <Grid.Col span={6} gutter={'lg'}>
                                        <NumberInput
                                            label="Jumlah Barang"
                                            placeholder="Masukkan jumlah pengajuan ..."
                                            radius={"xs"}
                                            size='sm'
                                            withAsterisk
                                            key={formItemPengajuan.key('jumlah')}
                                            {...formItemPengajuan.getInputProps('jumlah')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            readOnly
                                            variant='filled'
                                            label="Satuan Barang"
                                            radius={"xs"}
                                            value={satuanBarang ? satuanBarang : ''}
                                            withAsterisk
                                        />
                                    </Grid.Col>
                                </Grid>

                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={isMobile ? 12 : 6}>
                            <Textarea
                                label={<div>Keterangan <span className='text-gray-400'>(jika ada)</span></div>}
                                placeholder="Tuliskan keterangan..."
                                autosize
                                minRows={6}
                                radius={'xs'}
                                key={formItemPengajuan.key('keterangan')}
                                {...formItemPengajuan.getInputProps('keterangan')}

                            />
                        </Grid.Col>
                    </Grid>
                    <Group justify='flex-end'>
                        <Group>
                            <Button size='xs' radius={'xs'} variant='light' color='red' className='hover:opacity-60 transition' onClick={() => formItemPengajuan.reset()}>
                                Bersihkan
                            </Button>
                            <Button size='xs' radius={'xs'} variant='light' type='submit' className='hover:opacity-60 transition'>
                                Tambahkan
                            </Button>
                        </Group>
                    </Group>
                </Stack>
            </form>
            <Stack gap={'xs'}>
                <Text size='base' fw={'bold'}>Tabel Item Permintaan</Text>
                <DataTable
                    pinLastColumn
                    mih={150}
                    fz="xs"
                    withColumnBorders
                    records={itemPengajuan}
                    columns={[
                        {
                            accessor: 'no',
                            width: 50,
                            render: (_, index) => index + 1,
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
                            render: ({ barang }) => barang ? satuanBarangs.find((satuanBarang) => satuanBarang.id === barang.satuan_id).nama : 'N/A',
                        },
                        {
                            accessor: 'keterangan',
                            title: <div style={{ textAlign: 'center' }}>Keterangan</div>,

                        },
                        {
                            accessor: 'action', textAlign: 'center',
                            width: 60,
                            cellsStyle: () => ({ background: 'white' }),
                            titleStyle: () => ({ background: 'white' }),
                            render: (record) => (
                                <Menu shadow="md" width={110} position="bottom-end" offset={-5}>
                                    <Menu.Target>
                                        <ActionIcon variant="transparent" color="bluePrimary">
                                            <IconDots color={EXTENDED_COLOR.secondaryPurple} />
                                        </ActionIcon>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Item
                                            onClick={() => handleEdit(record)}
                                            leftSection={
                                                <IconEdit size={16} color={EXTENDED_COLOR.accent5} />
                                            }
                                        >
                                            <Text size="sm" c={'accent5'}>Edit</Text>
                                        </Menu.Item>
                                        <Menu.Item
                                            leftSection={
                                                <IconTrash size={16} color={EXTENDED_COLOR.accent6} />
                                            }
                                            onClick={() => {
                                                handleDeleteItemPengajuan(record.barangId)
                                            }}
                                        >
                                            <Text c="accent6" size="sm">
                                                Delete
                                            </Text>
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            )
                        }
                    ]}
                    totalRecords={itemPengajuan.length}
                    loadingText="Loading..."
                    noRecordsText="Data Tidak Ditemukan"
                />
            </Stack>
        </Stack>
    )
}

TambahPengajuan.layout = page => <UserLayout children={page} session={page.props.user} title="Pengajuan" />
export default TambahPengajuan