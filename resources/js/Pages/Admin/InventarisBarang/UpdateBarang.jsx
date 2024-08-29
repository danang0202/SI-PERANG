import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute';
import { showFailNotification } from '@/helper/notification.helper';
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout';
import UserLayout from '@/Layout/Layout';
import { router } from '@inertiajs/react';
import { Button, Grid, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'

const UpdateBarang = ({ jenisBarangs, satuanBarangs, prevBarang, status }) => {
    useEffect(() => {
        if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [status])
    const jenisBarangOptions = jenisBarangs.map(item => ({
        value: item.id.toString(),
        label: item.nama
    }));

    const satuanBarangOptions = satuanBarangs.map(item => ({
        value: item.id.toString(),
        label: item.nama
    }));

    const [loading, setLoading] = useState();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            kode: prevBarang.kode,
            nama: prevBarang.nama,
            jenisBarangId: prevBarang.jenis_barang_id.toString(),
            satuanId: prevBarang.satuan_id.toString(),
            jumlah: prevBarang.jumlah,
        },

        validate: {
            nama: (value) => {
                if (!value.trim()) {
                    return 'Nama tidak boleh kosong';
                }
                return null;
            },
            kode: (value) => {
                if (!/^\d{6}$/.test(value)) {
                    return 'Kode harus terdiri dari 6 digit angka';
                }
                return null;
            },
            jenisBarangId: (value) => {
                if (!value) {
                    return 'Jenis barang tidak boleh kosong';
                }
                return null;
            },
            satuanId: (value) => {
                if (!value) {
                    return 'Satuan barang tidak boleh kosong';
                }
                return null;
            },
            jumlah: (value) => {
                if (!value) {
                    return 'Jumlah tidak boleh kosong';
                }
                if (parseInt(value, 10) < 0) {
                    return 'Jumlah tidak boleh negatif';
                }
                return null;
            },
        },
    });


    const handleSubmit = (values) => {
        setLoading(true)
        router.post(route('admin.inventaris-barang.update.action', { id: prevBarang.id }), values, {
            onSuccess: () => {
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                console.log("Error handle submit create satuan");
            }
        });
    };

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack gap={"md"}>
                <Group justify='space-between' align='center'>
                    <Text size='sm'>Menambahkan Barang</Text>
                    <Group justify='flex-end'>
                        <ButtonOutlineWithRoute label={'Kembali'} route={route('admin.inventaris-barang')} />
                        <Button radius={'xs'} type='submit' loading={loading}>
                            Simpan
                        </Button>
                    </Group>
                </Group>
                <Grid gutter={{ base: 'md', lg: "lg" }}>
                    <Grid.Col span={6}>
                        <Stack gap={"lg"}>
                            <TextInput
                                label="Kode Barang"
                                placeholder="Masukkan kode barang ..."
                                description="Kode barang terdiri dari 5 digit angka"
                                radius={"xs"}
                                size='sm'
                                withAsterisk
                                key={form.key('kode')}
                                {...form.getInputProps('kode')}
                            />
                            <TextInput
                                label="Nama Barang"
                                description='Masukkan nama barang dengan sesuai'
                                placeholder="Masukkan nama barang"
                                radius={"xs"}
                                withAsterisk
                                key={form.key('nama')}
                                {...form.getInputProps('nama')}
                            />
                            <Select
                                label="Jenis Barang"
                                placeholder="Pilih jenis barang..."
                                description='Pilih salah satu dari jenis barang yang tersedia'
                                data={jenisBarangOptions} // Menggunakan data yang telah dipetakan
                                searchable
                                nothingFoundMessage="Nothing found..."
                                radius={'xs'}
                                withAsterisk
                                key={form.key('jenisBarangId')}
                                {...form.getInputProps('jenisBarangId')}
                            />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack gap={"lg"}>
                            <TextInput
                                withAsterisk
                                label="Jumlah Barang"
                                placeholder="Masukkan jumlah barang"
                                description='Masukkan jumlah barang dalam angka'
                                radius={"xs"}
                                type='number'
                                key={form.key('jumlah')}
                                {...form.getInputProps('jumlah')}
                            />
                            <Select
                                withAsterisk
                                label="Satuan Barang"
                                placeholder="Pilih satuan barang..."
                                description='Pilih salah satu dari satuan barang yang tersedia'
                                data={satuanBarangOptions} // Menggunakan data yang telah dipetakan
                                searchable
                                nothingFoundMessage="Nothing found..."
                                radius={'xs'}
                                key={form.key('satuanId')}
                                {...form.getInputProps('satuanId')}
                            />
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>
        </form >
    )
}

UpdateBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)
export default UpdateBarang