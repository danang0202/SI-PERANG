import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute';
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout';
import UserLayout from '@/Layout/Layout';
import { barangSchema } from '@/Schema/inventaris-barang.schema';
import { router } from '@inertiajs/react';
import { Button, Grid, Group, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { useEffect, useState } from 'react'

const CreateBarang = ({ jenisBarangs, satuanBarangs, existingBarangsKode }) => {
    const [selectedJenisBarang, setSelectedJenisBarang] = useState();
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
        mode: 'controlled',
        initialValues: {
            kode: '',
            nama: '',
            jenisBarangId: '',
            satuanId: '',
            jumlah: '',
        },

        validate: zodResolver(barangSchema)
    });


    const handleSubmit = (values) => {
        const temp = selectedJenisBarang.kode + values.kode;
        if (existingBarangsKode.includes(temp)) {
            form.setErrors({ kode: 'Kode sudah digunakan, silakan pilih kode lain.' });
            setLoading(false);
            return;
        }
        values.kode = temp;
        setLoading(true)
        router.post(route('admin.inventaris-barang.create.action'), values, {
        });
    };


    useEffect(() => {
        const temp = jenisBarangs.find((item) => item.id.toString() === form.values.jenisBarangId)
        setSelectedJenisBarang(temp);
    }, [form.values.jenisBarangId])

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
                            <Grid>
                                <Grid.Col span={5}>
                                    <TextInput
                                        label="Kode Jenis Barang"
                                        description="Kode depan / kode jenis  barang"
                                        radius={"xs"}
                                        size='sm'
                                        value={selectedJenisBarang ? selectedJenisBarang.kode : ''}
                                        variant='filled'
                                    />
                                </Grid.Col>
                                <Grid.Col span={7}>
                                    <TextInput
                                        label="Kode Barang"
                                        placeholder="Masukkan kode barang ..."
                                        description="Kode barang terdiri dari 6 digit angka"
                                        radius={"xs"}
                                        size='sm'
                                        withAsterisk
                                        key={form.key('kode')}
                                        {...form.getInputProps('kode')}
                                    />
                                </Grid.Col>
                            </Grid>
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
                            <NumberInput
                                withAsterisk
                                label="Jumlah Barang"
                                placeholder="Masukkan jumlah barang"
                                description='Masukkan jumlah barang dalam angka'
                                radius={"xs"}
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

CreateBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)

export default CreateBarang;
